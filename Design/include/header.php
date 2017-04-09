<?php


?>
<body onload="RightClick.init();">
<div id='wrapper-main'>
	
	<div id="header">
	<div id='logo'>
			<a href="index.php"><img src='images/fpo_final.png' width='300px' height='140px' alt='Football Playbook Online' /></a>
	</div>
	<div id="header-right">
		<div id='header-subnav'>
							
			<div id='googleAd'>
			<?php 
			
			if (!$session->isPremium)
			{
				echo '<script type="text/javascript"><!--
						google_ad_client = "ca-pub-5153722221214031";
						/* MPO 468x60 */
						google_ad_slot = "8393487324";
						google_ad_width = 468;
						google_ad_height = 60;
						//-->
					</script>
					<script type="text/javascript"
						src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
					</script>';
			}
			?>
			</div><!-- googleAd-->			
		</div><!-- subnav-->
	
		<div id="header-navigation">
		
			<div id='nav-left'></div>
			<div id='nav-contain'>
				<a class='nav-item' href="index.php">Home</a>
				<a class='nav-item' href="design.php">Design</a>
				<a class='nav-item' href="playbook.php">Playbooks</a>
				<a class='nav-item' href="contact.php">Support</a>
						
				<? if($session->logged_in){
					//ssi_logout(); //moved to welcome line
					echo "<a class='nav-item' href='account.php'>Account</a>";
				}
				else{

					echo "<a class='nav-item' href='forum/index.php?action=login'>Login</a>"; 
				}
				?>
			</div><!-- header nav contain-->
			<div id='nav-right'></div>	
	
		</div> <!-- header nav-->	

	
					
		<div id='facebook'>
				<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2FFootballPlaybookOnline%2F&amp;width=450&amp;height=80&amp;colorscheme=light&amp;layout=standard&amp;action=like&amp;show_faces=false&amp;send=true" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;margin-top:5px;" allowTransparency="true"></iframe>
		</div>
		<div id='status'>
			<? if($session->logged_in){
				echo "Welcome: ".$session->userfullname.". ";
				ssi_logout();
					
				echo "<br/>";
				
			} else {
				echo "Welcome: Guest";
			}
			?>
		</div>
	</div> <!-- header right -->
</div><!-- header-->
<div class="content-wrap">
	<div class="content-full">