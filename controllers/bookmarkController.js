const Bookmark  = require('../models/Bookmark')
const Job = require('../models/Job')

module.exports = {
    createBookmark: async (req, res) => {
      const jobId = req.body.job; 
      const userId = req.user.id;
  
      console.log('Received jobId: ', jobId); 
  
      try {
        console.log('Searching for job with ID: ', jobId); 
        const job = await Job.findById(jobId);
  
        if (!job) {
          console.log('Job not found for ID: ', jobId); 
          return res.status(400).json({ message: 'Job not found' });
        }
  
        console.log('Job found: ', job); 
  
        const newBookmark = new Bookmark({ job: jobId, userId: userId });
  
        console.log('Saving new bookmark...');
        const savedBookmark = await newBookmark.save();
        console.log('Bookmark saved: ', savedBookmark);
  
        return res.status(200).json({ status: true, bookmarkId: savedBookmark._id });
      } catch (error) {
        console.error('Error in createBookmark: ', error);
        return res.status(500).json({ message: error.message });
      }
    },


    deleteBookmark: async (req, res) => {
      const bookmarkId = req.params.bookmarkId;
    
      console.log('Received bookmarkId: ', bookmarkId); 
    
      try {
        const deletedBookmark = await Bookmark.findByIdAndDelete(bookmarkId);
    
        console.log('Deleted bookmark: ', deletedBookmark); 
    
        if (!deletedBookmark) {
          return res.status(404).json({ message: 'Bookmark not found' });
        }
    
        res.status(200).json({ status: true, message: 'Bookmark deleted' });
      } catch (error) {
        console.error('Error deleting bookmark: ', error.message);
        res.status(500).json({ message: error.message });
      }
    },
    

  getAllBookmarks: async (req, res) => {
    const userId = req.user.id;
  
    try{
      console.log(`Getting bookmarks for user: ${userId}`);
  
      const bookmarks = await Bookmark.find({userId:userId},{createdAt:0,updatedAt:0,__v:0}).populate(
        {
           path:'job',
           select:"-requriement -description -createdAt -updatedAt -__v"
        }
      )
  
      console.log(`Found ${bookmarks.length} bookmarks`); 
  
      bookmarks.forEach((bookmark, i) => {
        console.log(`Bookmark ${i}: ${JSON.stringify(bookmark)}`);
      });
  
      res.status(200).json(bookmarks)
    } catch (error){
      console.log(`Error getting bookmarks: ${error.message}`);
      res.status(500).json({message:error.message})
    }
  },

  getBookmark:async (req, res) => {
    const jobId = req.params.id;
    const userId = req.user.id;

    try{
      const bookmark = await Bookmark.findOne({userId:userId, job:jobId})
      if(!bookmark){
        return res.status(200).json(null)
      }    
      res.status(200).json({status:true, bookmarkId : bookmark._id})
    } catch (error){
      res.status(500).json({message:error.message})

    }
  },


}