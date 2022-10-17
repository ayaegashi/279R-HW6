<script>
    import { Meteor } from 'meteor/meteor';

    // Initialize empty variables to contain the username 
    // and password input values
    let username = "";
    let password = "";

    // Use Meteor's built-in accounts functionality to try to login the user
    const handleSubmit = () => {
        Meteor.loginWithPassword(username, password);
    }
</script>

<!-- Create form to allow user to log in -->
<!-- Call handleSubmit, defined above, when user tries to log in -->
<form class="login-form" on:submit|preventDefault={handleSubmit}>
    <div>
        <label htmlFor="username">Username</label>
        <!-- Store the user's input value in the "username" variable -->
        <input
                type="text"
                placeholder="Username"
                name="username"
                required
                bind:value={username}
        />
    </div>

    <div>
        <label htmlFor="password">Password</label>
        <!-- Store the user's input value in the "password" variable -->
        <input
                type="password"
                placeholder="Password"
                name="password"
                required
                bind:value={password}
        />
    </div>
    <div>
        <!-- Create submission button -->
        <button type="submit">Log In</button>
    </div>
</form>
