import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer'; // Import multer
import postRoutes from './routes/posts.js';
import UserModel from './models/Users.js';
import EventCardModel from './models/eventCard.js';
import http from 'http'
import { Server } from 'socket.io'
import conversationRoute from './routes/conversation.js';
import messagesRoute from './routes/messages.js';
import ConversationModel from './models/Conversation.js';
//backend for the project 
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use('/posts', postRoutes);

app.use('/conversations', conversationRoute);
app.use('/messages', messagesRoute);

// Set up multer storage
const storage = multer.memoryStorage(); // This will store the uploaded file in memory as a buffer
const upload = multer({ storage }); // Create the multer middleware
//connection witht hte database
const CONNECTION_URL = 'mongodb+srv://Mustafa:mustafa0503@cluster0.seqdo7a.mongodb.net/'

const PORT = process.env.PORT || 5000;
//Create the multer middleware
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // connecting the portal
    server.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log('Connected to MongoDB!');
    });

    io.on('connection', (socket) => {
      console.log('A client connected');

      socket.on('disconnect', () => {
        console.log('A client disconnected');
      });
    });
  })
  .catch((error) => console.log(error.message));




app.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email, password });

    if (user) {
      res.json({ status: "exist", userId: user._id});
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("notexist");
  }
});
    


//api call  for backend signup
app.post("/signup", async (req, res) => {
  const { email, password, phoneNumber, fname, lname } = req.body;

  // Check if the password is empty
  if (!password || !email || !phoneNumber || !fname || !lname) {
    return res.json("emptyPassword");
  }
  //moch verification


    // Check if the email is in the correct format


  else if (!email.includes("@gmail.com")) {
    return res.json("wrongFormat")
  }

  const data = {
    email: email,
    password: password,
    phoneNumber: phoneNumber,
    fname: fname,
    lname: lname
  };

  try {
    const check = await UserModel.findOne({ email: email });

    if (check) {
      // If it already exists
      res.json("exist");
    } else {

      const newUser = await UserModel.create(data); // Create a new user and get the created user object

      res.json({ status: "notexist", userId: newUser._id }); // Include the user ID in the response

    }
  } catch (e) {
    res.json("notexist");
  }
});



// Route to get all users inclduing current user

app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find(); // Retrieve all users from the UserModel

    res.json(users); // Respond with the retrieved users
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });       




  }
});



app.get('/checkFriendStatus/:userId/:friendId', async (req, res) => {
    const { userId, friendId } = req.params;
  
    try {
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (user.friend.includes(friendId)) {
        // The two users are already friends
        return res.json('friends');
      }
      if (user.request.includes(friendId)) {
        // The two users are already friends
        return res.json('in_request');
      }
      // The two users are not yet friends
      return res.json('not_friends');
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  





  app.delete('/removeFriend/:userId', async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body;
  
    try {
      const user = await UserModel.findById(userId);
      const friend = await UserModel.findById(friendId);
  
      if (!user || !friend) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove friendId from user's friend list
      const index1 = user.friend.indexOf(friendId);
      if (index1 !== -1) {
        user.friend.splice(index1, 1);
        await user.save();
      }
  
      // Remove userId from friend's friend list both direnctional
      const index2 = friend.friend.indexOf(userId);
      if (index2 !== -1) {
        friend.friend.splice(index2, 1);
        await friend.save();
      }
  
      res.json({ success: true, message: 'Friend removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.delete('/declineFriendRequest/:userId/:friendId', async (req, res) => {
    const { userId, friendId } = req.params;
  
    try {
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the friend request ID exists in the current user's request list
      if (!user.request.includes(friendId)) {
        return res.status(400).json({ error: 'Friend request not found' });
      }
  
      // Remove the friend request ID from the current user's request list
      user.request = user.request.filter((requestId) => requestId !== friendId);
      await user.save();
  
      res.json({ success: true, message: 'Friend request declined successfully' });
    } catch (error) {

      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  
  
  
//add friend 
// ...

app.post('/addFriend/:userId', async (req, res) => {
    const { friendId } = req.body;
    const userId = req.params.userId;
  
    try {
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
   


      // Check if the friend's ID already exists in the friend list
      if (user.friend.includes(friendId)) {
        return res.status(400).json({ error: 'Friend already exists' });
      }
  
      // Add the friend's ID to the friend list of the user accepting the request,
      user.friend.push(friendId);
      await user.save();
  
      // Find the sender of the friend request,
      const sender = await UserModel.findById(friendId);
  
      if (sender) {
        // Add the user accepting the request to the sender's friend list (bidirectional)
        sender.friend.push(userId);
        await sender.save();
  
        // Remove the recipient's ID from the sender's request array
        sender.request.pull(userId);
        await sender.save();
      }
  

      res.json({ status: 'success', message: 'Friend added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

//requst friend 
app.post('/addFriendRequest/:userId', async (req, res) => {
    const { userId } = req.params;

    const { senderId } = req.body;
  
    try {
      // Find the user who is receiving the friend request

      const recipientUser = await UserModel.findById(userId);
  
      // Check if the user is already in the request list (to avoid duplicates)
      if (!recipientUser.request.includes(senderId)) {
        recipientUser.request.push(senderId);
        await recipientUser.save();
  
        res.status(200).json({ success: true });
      } else {
        // User is already in the request list
        res.status(200).json({ success: false, message: 'Friend request already sent' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Error sending friend request' });
    }
  });
// ...
// Route to get friend requests for a specific user with id
app.get('/friendRequests/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const friendRequestIds = user.request; // Get the friend request IDs
  
      // Find the users who sent friend requests to the current user
      const friendRequests = await UserModel.find({ _id: { $in: friendRequestIds } });
  
      res.json(friendRequests);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
// Route to upload a profile picture for a user
app.post('/upload-profile-pic/:userId', upload.single('profilePic'), async (req, res) => {
  const userId = req.params.userId;

  try {
    // Get the profile picture file from the request
    const profilePic = req.file;

    // If there is no profile picture file, respond with an error
    if (!profilePic) {
      return res.status(400).json({ error: 'Profile picture not provided' });
    }

    // Encode the profile picture file to Base64
    const profilePicData = profilePic.buffer.toString('base64');

    // Find the user by ID
    const user = await UserModel.findById(userId);

    // If the user is not found, respond with an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's profilePic field with the Base64-encoded data
    user.profilePic = profilePicData;
    await user.save();

    res.json({ status: 'success', message: 'Profile picture uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});




//for interest
// Assuming you have the necessary imports and setup for your backend

// Route to update user interests
app.post('/select', async (req, res) => {
  const { interests, userId } = req.body;



  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's interests
    user.interest = interests;
    await user.save();

    res.json({ status: 'success', message: 'Interests updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update user interests
app.post('/select', async (req, res) => {
  const { interests, userId } = req.body;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's interests
    user.interest = interests;
    await user.save();

    res.json({ status: 'success', message: 'Interests updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get user interests
app.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user's interests
    res.json({ interests: user.interest });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/getUsers/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Respond with user's details, including the profile picture data
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Route to update a specific user
app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;


  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }


  const { fname, lname, email, phoneNumber } = req.body;


  UserModel.findByIdAndUpdate(
    userId,
    { fname, lname, email, phoneNumber },
    { new: true }
  )
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/addLocation/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { location } = req.body;

  if (!userId || !location) {
    return res.status(400).json({ error: 'User ID and location are required' });
  }

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the new location to the locations array
    user.locations.push(location);
    await user.save();

    res.json({ status: 'success', message: 'Location added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/removeLocation/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { locationIndex } = req.body;

  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the locationIndex is valid
    if (locationIndex >= 0 && locationIndex < user.locations.length) {
      // Remove the location from the locations array based on the locationIndex
      user.locations.splice(locationIndex, 1);
      await user.save();

      return res.json({ status: 'success', message: 'Location removed successfully' });
    } else {
      return res.status(400).json({ error: 'Invalid locationIndex' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/events', (req, res) => {
  const { themes } = req.query;
  const currentDate = new Date();

  let query = EventCardModel.find();

  if (themes && themes.length > 0) {
    query = query.where('themes').in(themes);
  }

  query
    .where('eventDate').gte(currentDate)
    .sort({ eventDate: 1 })
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Internal server error' });
    });
});

// Assuming you have a route to get events in your backend
app.get('/getEvents', (req, res) => {
  const { eventCreator } = req.query;

  // Fetch events from the database where eventCreator matches the provided email
  EventCardModel.find({ eventCreator })
    .then((events) => {
      res.json(events);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch events' });
    });
});

// DELETE route to delete an event by ID
app.delete('/deleteEvent/:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  try {
    // Find the event in the database and delete it
    const deletedEvent = await EventCardModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/enroll/:eventId', async (req, res) => {

  const eventId = req.params.eventId;
  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  /* Update spots in event */
  try {
    const event = await EventCardModel.findByIdAndUpdate(
      req.params.eventId,
      { $inc: { spots: -1 } },
      { new: true }
    ).exec();
    await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { enrolledEvents: event._id } },
      { new: true }
    ).exec();
    
    /* Use sockets to update all other clients */
    io.emit('spotUpdate', { eventId, spots: event.spots});

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/* Update user enrolledEvents */
/*
UserModel.findByIdAndUpdate(
  userId,
  { $addToSet: { enrolledEvents: event._id } },
  { new: true }
)
  .then(updatedUser => {
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(event);
  })
  .catch(err => {
    res.status(500).json({ error: 'Internal server error' });
  });
})
.catch(err => {
res.status(500).json({ error: 'Internal server error' });
});
*/

app.post('/unenroll/:eventId', async (req, res) => {
  const eventId = req.params.eventId;

  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  /* Update spots in event */
  try {
    const event = await EventCardModel.findByIdAndUpdate(
      req.params.eventId,
      { $inc: { spots: 1 } },
      { new: true }
    ).exec();
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { enrolledEvents: eventId } },
      { new: true }
    ).exec();
    /* Use sockets to update all other clients */
    io.emit('spotUpdate', { eventId, spots: event.spots});
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getUserId', (req, res) => {
  // Retrieve the user ID from the logged-in user's session or token
  const userId = req.body.userId; // Or retrieve from JWT token, cookies, etc.
  console.log(userId);

  if (!userId) {
    return res.status(400).json({ error: 'User ID not found' });
  }

  res.json({ userId });
});



app.post('/createConversation', async (req, res) => {
    const { members, event, eventId } = req.body; // Extract members, event, and eventId from the request body
  
    try {
      // Create a new conversation with the provided data
      const newConversation = await ConversationModel.create({ members, event, eventId });
  
      res.json(newConversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Failed to create conversation' });
    }
  });

  
// Route to find the conversation by event ID
app.get('/findConversationByEventId/:eventId', async (req, res) => {
    const eventId = req.params.eventId;
  
    if (!eventId) {
      return res.status(400).json({ error: 'Event ID is required' });
    }
  
    try {
      const conversation = await ConversationModel.findOne({ eventId: eventId });
      res.json(conversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  app.get('/findConversationByEvent/:eventName', async (req, res) => {
    const eventName = req.params.eventName;
  
    if (!eventName) {
      return res.status(400).json({ error: 'Event name is required' });
    }
  
    try {
      const conversation = await ConversationModel.findOne({ event: eventName });
      res.json(conversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  app.put('/updateConversation/:conversationId', async (req, res) => {
    const conversationId = req.params.conversationId;
  
    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required' });
    }
  
    const updatedConversation = req.body;
  
    try {
      const conversation = await ConversationModel.findByIdAndUpdate(
        conversationId,
        updatedConversation,
        { new: true }
      ).exec();
  
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      res.json(conversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


//handle unenroll for chat 
// Route to update the conversation's members
app.put('/updateConversationMembers/:conversationId', async (req, res) => {
    const conversationId = req.params.conversationId;
    const updatedMembers = req.body.members;
  
    if (!conversationId) {
      return res.status(400).json({ error: 'Conversation ID is required' });
    }
  
    try {
      // Find the conversation by its ID and update the members array
      const conversation = await ConversationModel.findByIdAndUpdate(
        conversationId,
        { members: updatedMembers },
        { new: true }
      ).exec();
  
      if (!conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }
  
      res.json(conversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  










// Endpoint to check if a valid conversation exists between the current user and the user to add
app.get('/checkValidConversation/:currentUserId/:userIdToAdd', async (req, res) => {
    const currentUserId = req.params.currentUserId;
    const userIdToAdd = req.params.userIdToAdd;
  
    try {
      // Perform a database query to check if a valid conversation exists
      const conversation = await ConversationModel.findOne({
        members: { $all: [currentUserId, userIdToAdd] },
        eventId: { $exists: false },
      });
  
      // Return the result of the query to the front-end
      res.json({ hasValidConversation: conversation !== null });
    } catch (error) {
      console.error('Error checking conversation:', error);
      res.status(500).json({ error: 'Error checking conversation' });
    }
  });
  



// Route to handle friend request
app.post('/addSentRequest/:userId', async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body;
  
    try {
      // Find the user who is sending the friend request
      const senderUser = await UserModel.findById(userId);
  
      // Find the user who is receiving the friend request
      const recipientUser = await UserModel.findById(friendId);
  
      // Check if both users exist in the database
      if (!senderUser || !recipientUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the friend request has already been sent
      if (senderUser.sentRequests.includes(friendId)) {
        return res.status(400).json({ error: 'Friend request already sent' });
      }
  
      // Add the friendId to the sender's sentRequests array
      senderUser.sentRequests.push(friendId);
      await senderUser.save();
  
      // You can implement additional logic here, such as sending a notification to the recipientUser
  
      res.status(200).json({ success: true, message: 'Friend request sent successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Error sending friend request' });
    }
  });




  app.get('/getSentRequests/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Assuming you have a database where you store the user data, fetch the user by their ID
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Extract and return the sentRequests array from the user object
      const sentRequests = user.sentRequests;
      console.log(sentRequests);
      return res.json(sentRequests);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });




  

  app.delete('/removeSentRequest/:senderId/:receiverId', async (req, res) => {
    const { senderId, receiverId } = req.params;
  
    try {
      // Find the sender and receiver users in the database
      const senderUser = await UserModel.findById(senderId);
      const receiverUser = await UserModel.findById(receiverId);
  
      if (!senderUser || !receiverUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove current user's ID from sender's sentRequest list
      senderUser.sentRequests = senderUser.sentRequests.filter((id) => id.toString() !== receiverId);
  
      // Save the updated sender user to the database
      const updatedSenderUser = await senderUser.save();

  
      return res.json({ success: true });
    } catch (error) {
      console.log('Error removing sent request:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  


  app.get('/getFriends/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Fetch the user's data from the database
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Retrieve the user's friends list from the 'friends' field
      const friends = user.friend;

      return res.json(friends);
    } catch (error) {
      console.log('Error fetching friends:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });








app.listen(5500, () => {
  console.log("Server is running");
});
