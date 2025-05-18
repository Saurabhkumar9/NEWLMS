
const { Webhook } =require('svix')
const User =require('../models/user.model')

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOKS_SECRET);
    
    
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkUserId: data.id, 
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
       
        await User.findOneAndUpdate({ clerkUserId: data.id }, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        
        await User.findOneAndDelete({ clerkUserId: data.id });
        res.json({});
        break;
      }

      default:
        res.json({});
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(400).json({ error: error.message });
  }
};


module.exports={clerkWebhooks}

