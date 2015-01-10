<!--new college-->
<div id="clgwrap" style="z-index:30000;display:none;position:absolute;">
	<div id="clgregister">
		<div id="new_college_details" class="form_wrapper" style="display:block;">
		<h3>Add new college</h3>
		<span>Please provide your college name neatly and completely.</span>
		<form method="post">
			<div class="inputwrap college"><input type="text" placeholder="College Name" id="ncname" /></div>
			<input type="submit" value="Add" />
		</form>
</div>
	</div>
	<div id="clgregback"></div>
</div>














<!--login status start-->
<div id="reglogstatus">
	<div id="notloggedin" class="call-login">LOGIN / REGISTER</div>
	<div id="loggedin">
		<div id="loggedin-status">
			<div id="pic"></div>
			<div id="usname"></div>
			<a href='javascript:;' onclick='tat_logout()'>
				<div id="logout"> LOGOUT </div>
			</a>
		</div>
		<div id="loggedin-profile">
			<div id=""></div>
			<div id="profile"><span class="grey">Profile</span></div>
			<div id="usid" class="inprofile" style="cursor:default"></div><br/>
			<div id="uscollege" class="inprofile" style="cursor:default"></div><br/>
			<div id="usphone" class="inprofile" style="cursor:default"></div><br/>
			<div id="usmail" class="inprofile" style="cursor:default"></div><br/>
			<div id="usevents" style="cursor:default">
				<div id="usersevents">
					<div id="noevent" class="profileevent">No events registered!</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--login status end-->

<!--event reg start-->
<div id="eventregwrap">
	<div id="event_register">
		<div class="form_wrapper">
			<h3>Event Registration</h3>
			<!--<form action="rregister.php" method="POST" class="event">
				<div id="event_mates">
					<input type="text" id="mates_input" placeholder="teammates (if any)" />
				</div>
				<input value="register" type="submit" style="margin-left:35%;"/>
				<p id="par_details" style="font-size:12px; color:#383838"></p>
			</form>	-->
Online registration is over!
		</div>
	</div>
	<div id="eventregback"></div>
</div>
<!--event reg end-->

<!--Reg-->
	<div id="reg-wrap">
		<div id="reg-logoption" class="moveright">
			<div id="form_wrapper" class="form_wrapper">
				<form class="register">
			    	<h3>Register</h3>
			    	<div class="column">
			        	<div>
			        		<label for="reg-uname">Username:</label>  
							<input type="text" uname="reg-uname" id="reg-uname" size="30" value="" placeholder="username" class="text-input" />  
							<label class="error" for="uname" id="reg-uname_error">This field is required.</label>
						</div>
						<div>
				           <label for="reg-email" id="reg-email_label">Email:</label>
							<input type="text" name="reg-email" id="reg-email" size="30" value="" placeholder="email" class="text-input" />  
							<label class="error" for="name" id="reg-email_error">This field is required.</label>   
				        </div>
			        	<div>
			            	<label for="reg-password">Password:</label>  
							<input type="password" name="reg-password" id="reg-password" size="30" value="" placeholder="password" class="text-input" />  
							<label class="error" for="reg-password" id="reg-password_error">This field is required.</label>
			        	</div>
			        	<div>
			        		<label for="reg-repassword">Re-enter Password:</Re>  
							<input type="password" name="reg-repassword" id="reg-repassword" size="30" value="" placeholder="repassword" class="text-input" />  
							<label class="error" for="reg-repassword" id="reg-password_error">This field is required.</label> 
			        	</div>
			    	</div>
			    	<div class="column">
				        <div>
				            <label for="reg-name">Name:</label>
							<input type="text" name="reg-name" id="reg-name" size="30" value="" placeholder="name" class="text-input" />  
							<label class="error" for="name" id="reg-name_error">This field is required.</label>
				        </div>
				        <div>
				        	<label for="reg-clg">College:</label>
				        		<div class="inputwrap college">
				        			<div class="ui-widget">
				        				<input id="college_name" type="text" placeholder="College" />
				        			</div>
				        			<div class="sbutton" id="college_overshadow" style="display:none;cursor:pointer">
				        			</div>
				        		</div>
							<label class="error" for="name" id="reg-clg_error">This field is required.</label>
						</div>
				        <div>
				            <label for="reg-phno">Phone:</label>
							<input type="text" name="reg-phno" id="reg-phno" size="30" value="" placeholder="phno" class="text-input" />  
							<label class="error" for="name" id="reg-phno_error">This field is required.</label>
				        </div>
				        <div>
				            <input type="checkbox" name="year" value="f" id="checkbox"/>Final Year
				        </div>
				    </div>
				    <div class="bottom">
				        <input type="submit" id="reg-submit" value="Register" />
				        <a href="#" rel="login" id="gotolog" class="linkform">
				            You have an account already? Log in here
				        </a>
				        <div class="clear"></div>
				    </div>
				</form>
				<form class="login active">
			    	<h3>Login</h3>
			    	<div>
			        	<label>Username:</label>
			    	    <input type="text" name="log-name" id="log-name" size="30" value="" placeholder="username" class="text-input" />
			   		</div>
			    	<div>
			        	<label>Password:</label>
			        	<input type="password" name="log-password" id="log-password" size="30" value="" placeholder="password" class="text-input" />
			    	</div>
			    	<div class="bottom">
			        	<input type="submit"  id="log-submit" value="Login" />
			        	<a href="#" rel="register" id="gotoreg" class="linkform">
			            	You don't have an account yet? Register here
			        	</a>
			        	<div class="clear"></div>
			    	</div>
				</form>
			</div>		
		</div>

		<div class="reg-back"></div>
	</div>
	<!--Regend-->
	<!--Adding colleges-->
	<!--div id="new_college_details" style="display:none;">
		<span>Please provide your college name neatly and completely.</span>
		<form method="post" action="rnewclg.php">
			<div class="inputwrap college"><input type="text" placeholder="College Name" id="ncname" /></div>
			<input type="submit" value="Add" />
		</form>
	</div-->