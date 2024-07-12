import express from 'express';
import Note from './Modules/Note.js';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 4000;


const connectDB = async () => {
    await mongoose.connect('mongodb+srv://bhoyatedhanashree:pAGWf0rdgP7v7soD@cluster0.tkmvcuk.mongodb.net/Notes')
    console.log("DB Connected")
}
connectDB();

app.listen(PORT, () => {
    console.log("server is responsing", PORT)
})


app.post('/note', (req, res) => {

    try {
        const { title, content, categories } = req.body;

        const newNotes = Note.create({
            "title": title,
            "content": content,
            "categories": categories
        })

        res.json({
            Success: true,
            notes: newNotes,
            msg: "Notes are added successfully"
        })
    }
    catch(er){
        res.json({
            Success: true,
            msg: er.message
        })
    }

})


app.get('/note/:_id', async (req, res) => {

    try {

        const { _id } = req.params;
        const noteByid = await Note.findOne({ _id: _id });
        res.json({
            Success: true,
            _id: _id,
            data: noteByid,
            msg: `Notes are fetched sucessfully by id :${_id}`
        })
    }
    catch (error) {
        console.log(error)
    }
})

// get all notes by find

app.get('/notes', async (req, res) => {
    try {
        const Allnotes = await Note.find();
        res.json(Allnotes)
    }
    catch (error) {
        console.log(error)
    }
})

// get by query
app.get('/note', async (req, res) => {

    try {
        const { title } = req.query;
        const note = await Note.findOne({ title: title });
        res.json({
            data: note,


        })
    } catch (error) {
        console.log(error)
    }

})

// delete api 

app.delete('/note/:_id', async (req, res) => {

    try {
        const { _id } = req.params;
        const delnote = await Note.deleteOne({ _id: _id });
        res.json({
            Success: true,
            _id: _id,
            data: delnote,
            msg:"Note is deleted successfully ..."
            // msg: `Notes is deleted sucessfully by id :${_id}`
        })

    } catch (error) {
        console.log(error)
    }
})


app.put('/note/:_id', async (req, res) => {

    try {
        const { _id } = req.params;
        const { title, content, categories } = req.body;
        const update = await Note.updateOne(
            { _id: _id },
            { $set: { title: title, content: content, categories: categories } }
        );


        res.json({
            Success: true,
            _id: _id,
            data: update,
            msg: `Notes are updated Sucessfully`
        })

    } catch (error) {
        console.log(error)
    }
})