<?php
echo (session_start() && session_destroy()) ? '[-2]' : '[0]';
?>