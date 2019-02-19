
/**** Configuration Options

afterSubmitCallback: 	(String) name of the javascript function to call after user submits a captcha challenge. The response object
							will be the following:
							{	"result": ["failed" | "passed"],
								"td": [Epoch timestamp of latest response],
								["error": [Message of possible error]]
							}
afterRefreshCallback: 	(String) name of the javascript function to call after user refreshes the current captcha with a new challenge. 
							The response object	will be the following:
							{	"result": ["failed" | "refreshed"],
								"td": [Epoch timestamp of latest response],
								["error": [Message of possible error],]
								["image": [If not failed, string representing a 64 bit image],]
								["hash": [If not failed, string representing the hash that will be compared to the challenge response]]
							}
refreshOnFail: 			(Boolean) whether or not to refresh the captcha after the user fails the captcha challenge.
hashsalt:				(String) the string that is used to salt the hash for comparing the captcha.
captchaType:			(String) either "string" or "math". String is an alpha-numeric string of sudo-random characters and expects the 
							same characters as a response. Math is additions or subrtaction of 2 sudo-randomly chosen numbers, written 
							out in words, expecting an integer in response.
height:					(Integer) height of the captcha image. Minimum width is 230px for string type captcha and 430px for math type. 
width:					(Integer) width of the captcha image.

 **** The following options are for "string" type captcha
	caseSensitive: 			(Boolean) if false, string is converted to lower case before hashing.
	numberOfCharacters:		(Integer) number of characters in the captcha image.
	allCharacters: 			(String) string of characters (letters and numbers) from which to choose randomly. The default string leaves 
								out [ i, I, l, L, o, O, 1, 0 ] because these may be ambiguous in some fonts.
 ****

useStyles:				(Boolean) if true, uses default styles. False will exclude stylesheet and you will style to fit your needs.
rotateCharacters:		(Boolean) whether to give each character a random rotation from 20 to -20. False will vertically align text
 							to the center of the captcha image (this does not account for possible font italicization skewing).
fontColor:				(String) a valid color for the font of the captcha.
fontSize:				(Integer) the font size for the characters.
bgColor:				(String) a valid color for the background of the captcha.
bgTransparent:			(Boolean) if true, sets the color specified in "bgColor" as transparent.
displayGrid:			(Boolean) whether to put down a grid of gray lines before drawing the rest of the captch image.
gridColor:				(String) a valid color for the grid, if displayed.
obscure:				(Boolean) if true, 3 colored lines will be placed across the captcha image to slightly obsure the letters.
displayRefreshImage:	(Boolean) if true, displayed a refresh icon inside the refresh button.
refreshImageColor:		(String) a valid color for the refresh icon. 

****/

exports.config = {
	"afterSubmitCallback": null,
	"afterRefreshCallback": null,
	"refreshOnFail": true,
	"hashsalt": "noFxGivin",
	"captchaType": "string",
	"caseSensitive": false,
	"numberOfCharacters": 8,
	"allCharacters": "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789",
	"useStyles": true,
	"height": 50,
	"width": 230,
	"rotateCharacters": true,
	"fontColor": "#000",
	"fontSize": 30,
	"bgColor": "#FFF",
	"bgTransparent": false,
	"displayGrid": true,
	"gridColor": "#EEE",
	"obscure": true,
	"displayRefreshImage": true,
	"refreshImageColor": "#2C2"
};


/**** True Type Font Configuration

cd /; locate -i *.ttf > ~/fonts.txt

****/

exports.fonts = function(){
	return [
		"/etc/alternatives/fonts-japanese-gothic.ttf",
		"/usr/share/cups/fonts/FreeMono.ttf",
		"/usr/share/cups/fonts/FreeMonoBold.ttf",
		"/usr/share/cups/fonts/FreeMonoBoldOblique.ttf",
		"/usr/share/cups/fonts/FreeMonoOblique.ttf",
		"/usr/share/fonts/truetype/fonts-japanese-gothic.ttf",
		"/usr/share/fonts/truetype/freefont/FreeMono.ttf",
		"/usr/share/fonts/truetype/freefont/FreeMonoBold.ttf",
		"/usr/share/fonts/truetype/freefont/FreeMonoBoldOblique.ttf",
		"/usr/share/fonts/truetype/freefont/FreeMonoOblique.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSans.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSansBold.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSansBoldOblique.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSansOblique.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSerif.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSerifBoldItalic.ttf",
		"/usr/share/fonts/truetype/freefont/FreeSerifItalic.ttf",
		"/usr/share/fonts/truetype/lao/Phetsarath_OT.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationMono-BoldItalic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationMono-Italic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSans-BoldItalic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSans-Italic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Bold.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSansNarrow-BoldItalic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Italic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Regular.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSerif-BoldItalic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf",
		"/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
		"/usr/share/fonts/truetype/nanum/NanumGothic.ttf",
		"/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf",
		"/usr/share/fonts/truetype/nanum/NanumMyeongjo.ttf",
		"/usr/share/fonts/truetype/takao-gothic/TakaoPGothic.ttf",
		"/usr/share/fonts/truetype/tlwg/Garuda-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Garuda-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Garuda-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Garuda.ttf",
		"/usr/share/fonts/truetype/tlwg/Kinnari-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Kinnari-BoldItalic.ttf",
		"/usr/share/fonts/truetype/tlwg/Kinnari-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Kinnari-Italic.ttf",
		"/usr/share/fonts/truetype/tlwg/Kinnari-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Kinnari.ttf",
		"/usr/share/fonts/truetype/tlwg/Loma-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Loma-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Loma-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Loma.ttf",
		"/usr/share/fonts/truetype/tlwg/Norasi-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Norasi-BoldItalic.ttf",
		"/usr/share/fonts/truetype/tlwg/Norasi-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Norasi-Italic.ttf",
		"/usr/share/fonts/truetype/tlwg/Norasi-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Norasi.ttf",
		"/usr/share/fonts/truetype/tlwg/Purisa-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Purisa-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Purisa-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Purisa.ttf",
		"/usr/share/fonts/truetype/tlwg/Sawasdee-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Sawasdee-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Sawasdee-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Sawasdee.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgMono-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgMono-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgMono-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgMono.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypewriter-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypewriter-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypewriter-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypewriter.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypist-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypist-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypist-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypist.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypo-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypo-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypo-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/TlwgTypo.ttf",
		"/usr/share/fonts/truetype/tlwg/Umpush-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Umpush-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Umpush-Light.ttf",
		"/usr/share/fonts/truetype/tlwg/Umpush-LightOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Umpush-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Umpush.ttf",
		"/usr/share/fonts/truetype/tlwg/Waree-Bold.ttf",
		"/usr/share/fonts/truetype/tlwg/Waree-BoldOblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Waree-Oblique.ttf",
		"/usr/share/fonts/truetype/tlwg/Waree.ttf",
		"/usr/share/fonts/truetype/ttf-dejavu/DejaVuSans-Bold.ttf",
		"/usr/share/fonts/truetype/ttf-dejavu/DejaVuSans.ttf",
		"/usr/share/fonts/truetype/ttf-dejavu/DejaVuSansMono-Bold.ttf",
		"/usr/share/fonts/truetype/ttf-dejavu/DejaVuSansMono.ttf",
		"/usr/share/fonts/truetype/ttf-dejavu/DejaVuSerif-Bold.ttf",
		"/usr/share/fonts/truetype/ttf-dejavu/DejaVuSerif.ttf",
		"/usr/share/fonts/truetype/ttf-khmeros-core/KhmerOS.ttf",
		"/usr/share/fonts/truetype/ttf-khmeros-core/KhmerOSsys.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-B.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-BI.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-C.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-L.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-LI.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-R.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/Ubuntu-RI.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-B.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-BI.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-R.ttf",
		"/usr/share/fonts/truetype/ubuntu-font-family/UbuntuMono-RI.ttf",
		"/usr/share/ghostscript/9.05/Resource/CIDFSubst/DroidSansFallback.ttf"
	];
}();