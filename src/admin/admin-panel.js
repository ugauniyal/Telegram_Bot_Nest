document.getElementById('updateApiKeyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const newApiKey = document.getElementById('newApiKey').value;

    try {
      const response = await fetch('/admin/api-key', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if required
        },
        body: JSON.stringify({ apiKey: newApiKey }),
      });

      if (response.ok) {
        alert('API key updated successfully');
      } else {
        alert('API key update failed');
      }
    } catch (error) {
      console.error('Error updating API key:', error);
      alert('An error occurred while updating the API key');
    }
  });