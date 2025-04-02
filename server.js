import app from "./app.js";

const PORT = process.env.PORT || 8002;

app.listen(PORT,"0.0.0.0", () => {
    console.log(`🚀 Project Microservice is running on port ${PORT}`);
});
