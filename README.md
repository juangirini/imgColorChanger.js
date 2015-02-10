# imgColorChanger.js
Easy tool to change an image color

Inspired on Delta's answer to StackOverflow question: http://stackoverflow.com/questions/9303757/how-to-change-color-of-an-image-using-jquery

#Instructions
1) Load the JS file in the header
<script type="text/javascript" src="path/to/imageColorChanger.js"></script>

2) Create your image
<img src="IMAGE.png" id="myImage" />

3) Just call the ImgColorChanger.changeColor(element, hexColor)
ImgColorChanger.changeColor(document.getElementById('myImage'), '#123456')

4) Done! it will change all whites to the new hexColor