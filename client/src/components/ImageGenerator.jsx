import { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');



  const handleGenerateImage = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${prompt}`);
      setImage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black-800">
      <div className="bg-gray-300 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">Image Generator</h1>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-900">
          Enter Prompt:
        </label>
        <input
          type="text"
          id="prompt"
          className="input input-bordered mt-1 p-2 border border-gray-300 rounded-md"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="mt-3 ml-3 px-4 py-2 btn btn-active rounded-md"
          onClick={handleGenerateImage}
        >
          Generate Image
        </button>
        {image && (
          <div className="mt-4">
            <img src={image} alt="Generated Image"  style={{ width: '500px', height: '500px' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
