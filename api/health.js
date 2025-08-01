module.exports = (req, res) => {
  // Create response object
  const response = { status: 'OK', timestamp: new Date().toISOString() };
  
  // Log the response object for debugging
  console.log('Response object:', response);
  
  // Convert to JSON string
  const jsonString = JSON.stringify(response);
  
  // Log the JSON string for debugging
  console.log('JSON string:', jsonString);
  
  // Set content type and send response
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(jsonString);
};
