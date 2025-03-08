import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
	try {
		const {name,email,password}=req.body;
		if(!name || !email || !password){
			return res.status(400).json({message:'All fields are required'});
		}
		const user=await User.create({name,email,password});
		res.status(201).json({message:'User created successfully',data:user._id});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const {email,password}=req.body;
		if(!email || !password){
			return res.status(400).json({message:'All fields are required'});
		}
		const user=await User.findOne({email});
		if(!user){
			return res.status(400).json({message:'Invalid email'});
		}
		const isMatch=await user.comparePassword(password);
		if(!isMatch){
			return res.status(400).json({message:'Invalid password'});
		}
		const token=jwt.sign(
			{userId:user._id},
			process.env.JWT_SECRET,
			{expiresIn:'7d'}
		);
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
			maxAge: 7*24 * 60 * 60 * 1000,
		});
		res.status(200).json({message:'Login successful',data:user._id});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie('token');
		res.status(200).json({message:'Logout successful'});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

export const me = async (req, res) => {
	try {
		res.status(200).json({data:req.user});
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};