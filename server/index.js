import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import UserModel from './models/Users.js';
import EventCardModel from './models/eventCard.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts', postRoutes);
const CONNECTION_URL = 'mongodb+srv://Mustafa:mustafa0503@cluster0.seqdo7a.mongodb.net/'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`)))
    .catch((error)=> console.log(error.message));



    app.post("/", async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const user = await UserModel.findOne({ email, password });
    
        if (user) {
          res.json({ status: "exist", userId: user._id });
        } else {
          res.json("notexist");
        }
      } catch (e) {
        res.json("notexist");
      }
    });
    





app.post("/signup", async (req, res) => {
    const { email, password, fname, lname } = req.body;
    
    // Check if the password is empty
    if (!password||!email||!fname||!lname) {
        return res.json("emptyPassword");
    }
    else if(!email.includes("@gmail.com")){
        return res.json("wrongFormat")
    }
  
    const data = {
        email: email,
        password: password,
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



app.get('/getUsers', (req, res) => {
  const userId = req.query.userId;


  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }


  UserModel.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Route to update a specific user
app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId;


  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }


  const { fname, lname, email } = req.body;


  UserModel.findByIdAndUpdate(
    userId,
    { fname, lname, email },
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


app.get('/events', (req, res) => {
  EventCardModel.find()
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      res.status(500).json({ error: 'Internal server error' });
    });
});


app.post('/enroll/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  EventCardModel.findById(eventId)
    .then(event => {
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

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
});

app.post('/unenroll/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  UserModel.findByIdAndUpdate(
    userId,
    { $pull: { enrolledEvents: eventId } },
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

app.get('/getUserId', (req, res) => {
    // Retrieve the user ID from the logged-in user's session or token
    const userId = req.body.userId; // Or retrieve from JWT token, cookies, etc.
    console.log(userId);
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found' });
    }
  
    res.json({ userId });
  });
  
app.listen(5500, () => {
  console.log("Server is running");
});
