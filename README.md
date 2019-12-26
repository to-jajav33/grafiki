# grafiki
Making JSON more graph like. Just like Rafiki helped Mufasa remember who he is, Grafiki helps JSON nodes remember who they are.

# WHY?
Mainly because I had a long weekend to work on a project. But secondly, because there was need to convert GunDB into typescript. But as I was working, I wanted to make some changes so I did.

# WHAT DOES IT DO?
It allows JSON to have circular references by storing ID of nodes, instead of the actual object. Using the Grafiki api of ref/put/push/getData/val to do what you want with the JSON.

# WHAT's Next??
I am hoping to end this project early and little by little add things to it. Currently I just want it to generate the circular JSON, and read it from a localStorage for persistent data. GunDB does all the fancy networking thing, maybe I will add that here or create a separate module for it. Time will tell.

If it Helps you out... Enjoy!
