// import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
// import axios from 'axios';

// import { useState } from 'react'

// function App() {
// const [emailcontent,setemailcontent]=useState('');
// const [tone,settone]=useState('');
// const [generatedReply,setGeneratedReply]=useState('');
// const [loading,setloading]=useState(false);
// const[error,seterror]=useState('');

// const handleSubmit=async()=>{
//   setloading(true);
//   seterror('');
//   try{
//     const response=await axios.post("http://localhost:8080/api/email/generate",{
//       emailcontent,
//       tone
//     });

//     setGeneratedReply(typeof response.data==='string'? response.data : JSON.stringify(response.data));
//   }catch(error){
//     seterror('Failed to generate email reply. Please try again ')
//     console.error(error);

//   }finally{
//     setloading(false);
//   }
// };
//   return (
//     <>
//       <Container maxWidth="md" sx={{py:4}}>
//         <Typography variant="h2" component="h2" gutterBottom>Email Reply</Typography>
//         <Box sx={{mx:3}}>
//           <TextField 
//           fullWidth
//           multiline
//           rows={6}
//           variant='outlined'
//           label="original email"
//           value={emailcontent|| ''}
//           onChange={(e)=> setemailcontent(e.target.value)}
//           sx={{mb:2}}
//           />
          
//           <FormControl fullWidth sx={{mb:2}}>
//             <InputLabel id="">Tone(Optional)</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={tone || ''}
//               label="Tone(Optional)"
//               onChange={(e) =>settone(e.target.value) }
//             >
//               <MenuItem value="">None</MenuItem>
//               <MenuItem value="Professional">Professional</MenuItem>
//               <MenuItem value="Casual">Casual</MenuItem>
//               <MenuItem value="Friendly">Friendly</MenuItem>

//             </Select>
//           </FormControl>

//           <Button variant="contained"
//           onClick={handleSubmit}
//           disabled={!emailcontent|| loading}>
//             {loading ? <CircularProgress size={24}/>:"Generate Reply"}
//           </Button>
//         </Box>
//         {error && (
//           <Typography color='error' sx={{mb:2}}>
//             {error}
//           </Typography>

//         )}
//         {generatedReply &&(
//           <Box sx={{mt:3}}>
//             <Typography></Typography>
//           </Box>
//         )}


//         {error && (
//           <Typography color='error' sx={{mb:2}}>
//             {error}
//           </Typography>

//         )}
//         {generatedReply &&(
//           <Box sx={{mt:3}}>
//             <Typography variant='h6' gutterBottom>
//               Genrated  Reply:
//             </Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={6}
//               variant='outlined'
//               value={generatedReply|| ''}
//               inputProps={{readOnly:true}}
//             />
//             <Button
//             variant='outlined'
//             sx={{mt:2}}
//             onClick={()=>navigator.clipboard.writeText(generatedReply)}
//             >
//               Copy to Clipboard
//             </Button>
//           </Box>
//         )}
        
//       </Container>
     
//     </>
//   )
// }

// export default App
import axios from 'axios';
import { useState } from 'react';
import './App.css'; // We'll add CSS below

function App() {
  const [emailcontent, setemailcontent] = useState('');
  const [tone, settone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('');

  const handleSubmit = async () => {
    setloading(true);
    seterror('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailcontent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      seterror('Failed to generate email reply. Please try again');
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply);
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="title">Email Reply Generator</h1>
        
        <div className="form-group">
          <label className="label">Original Email</label>
          <textarea
            className="textarea"
            rows={6}
            placeholder="Paste the original email here..."
            value={emailcontent}
            onChange={(e) => setemailcontent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label">Tone (Optional)</label>
          <select className="select" value={tone} onChange={(e) => settone(e.target.value)}>
            <option value="">None</option>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Friendly">Friendly</option>
          </select>
        </div>

        <button
          className={`submit-btn ${loading ? 'loading' : ''}`}
          onClick={handleSubmit}
          disabled={!emailcontent || loading}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              Generating...
            </>
          ) : (
            'Generate Reply'
          )}
        </button>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {generatedReply && (
          <div className="reply-section">
            <h2 className="reply-title">Generated Reply:</h2>
            <textarea
              className="textarea reply-textarea"
              rows={6}
              value={generatedReply}
              readOnly
            />
            <button className="copy-btn" onClick={copyToClipboard}>
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

