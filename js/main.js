
const form = document.getElementById('leadForm');
const responseEl = document.getElementById('response');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch(
            'https://script.google.com/macros/s/AKfycbwyhaSF7srcLBfHOugKnMTCmbbwEz6IuTShaI0vva8L1D7WhBUY6giUIDWHnXHmpH6F/exec',
            {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );
        form.reset();
        console.log(res);
        if (!res.ok) {
            responseEl.textContent = "Broke here. No OK response";
           // const errorText = await res.text();
           // throw new Error(`HTTP error! status: ${res.status}. Details: ${errorText}`);
        }

        // Parse the JSON response body
        const responseData = await res.json();
        // responseEl.textContent = responseData;
        // console.log('Success:', responseData);

        if (responseData.updates && responseData.updates.updatedRows >= 1) {
            // console.log('Data successfully appended to Google Sheets.');
            responseEl.textContent = "Success: Data successfully appended to Google Sheets."
            // You can return the responseData or a custom success object here
            // return { status: 'success', message: 'Data added successfully' };
        } else {
            responseEl.textContent = "Request was ok, but no rows were updated"
            // console.log('Request was ok, but no rows were updated.');
            // return { status: 'error', message: 'No rows updated' };
        }



        // const result = await res.json();
        // console.log(result);
        //  responseEl.textContent = result;

        /*
        if (result.status === 'success') {
            responseEl.textContent = 'Form submitted successfully!';
            form.reset();
        } else {
            responseEl.textContent = 'Submission failed.';
        } 
        */

    } catch (error) {
        console.error('Error posting data:', error);
       responseEl.textContent = "Success: you hear from us soon"
    }

});




// Function to get a specific URL parameter value
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// When the page loads, populate the hidden fields
window.onload = function () {
    document.getElementById('utm_source').value = getUrlParameter('utm_source');
    document.getElementById('utm_medium').value = getUrlParameter('utm_medium');
    document.getElementById('utm_campaign').value = getUrlParameter('utm_campaign');
};