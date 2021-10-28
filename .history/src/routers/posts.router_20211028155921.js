const express = require('express')
const router = express.Router()

// load model
const Post = require('../models/post.model')
//post add
router.get('/add', (req,res) => {
		res.render('posts/add')
})
//show list post
router.get('/', async (req, res) => {
	const listPosts = await Post.find().lean().sort({date: -1})
	res.render('posts/index', { posts: listPosts })
})

//create new post
router.post('/', async (req, res)=>{
	const {title, description } = req.body

	let error = []

	if (!title) error.push({msg: 'Title require'})
	if (!description) error.push({msg: 'Description require'})
	if(error.length > 0 ) res.render('posts/add', {title, description})
	else {
		const newPostData = {title, description}
		const newPost = new Post(newPostData)
		await newPost.save()
		res.redirect('/posts')
	}
})

//Form edit Post
router.get('/edit/:id', async (req, res) => {
	const post = await Post.findOne({_id: req.params.id}).lean()
	res.render('posts/edit', {post})
})
//update post
router.put('/:id', async (req, res) => {
	const {title, description} = req.body
	await Post.findOneAndUpdate({_id: req.params.id},{title, description})
	res.redirect('/posts')
})
//delete post
router.delete('/:id', async (req, res) => {
	await Post.findOneAndRemove(_id: req.params.id)
	res.redirect('/posts')
})
module.exports = router