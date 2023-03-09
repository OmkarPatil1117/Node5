### `npm run both`

Hosts react application and backend simultaneously.

<h1>There are two routes in this application:</h1>
<h3>/register API</h3>
<p>It takes user's Name, Password, Email & Phone no. and save the data. If the details provided by user are correct then a success message is sent by the API otherwise a failure message on submitting wrong details.</p>
<b>The password is also hashed before saving it.</b>
<h3>/login API</h3>
<p>It takes user's Email & Password.If the details provided by user are correct then a JWT token is created & stored in the localstorage of the user along with a success message by the API otherwise a failure message is sent on submitting wrong details.</p>