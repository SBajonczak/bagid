// Custom Luggage/Bag Tag with QR Code 

$fn = 120;

/* [Tag 🏷️] */

// Hide the TAG.
HIDE_TAG        = false;

// Select your Tag size to include more or less text lines
Tag_Size        = "S";// [QR:QR ONLY, S:SMALL, M:MEDIUM, L:LARGE]

// Tag Thickness (mm)
Tag_Thickness   = 5;// [1:0.5:10]

// Text Thickness (mm)
Text_Thickness  = 0.5;// [0.5:0.5:10]

// QR Thickness (mm)
QR_Thickness    = 1;// [0.5:0.5:10]

// Make the Tag a flat surface.
Facedown_Mode   = false;


/* [On/Off Text Lines (1-9) ✅] */

//Add this text line to the tag.
ADD_TEXT_LINE_1     = true;

//Add this text line to the tag.
ADD_TEXT_LINE_2     = true;

//Add this text line to the tag.
ADD_TEXT_LINE_3     = true;

//Add this text line to the tag.
ADD_TEXT_LINE_4     = false;

//Add this text line to the tag.
ADD_TEXT_LINE_5     = false;

//Add this text line to the tag.
ADD_TEXT_LINE_6     = false;

//Add this text line to the tag.
ADD_TEXT_LINE_7     = false;

//Add this text line to the tag.
ADD_TEXT_LINE_8     = false;

//Add this text line to the tag.
ADD_TEXT_LINE_9     = false;


/* [Basic Text Lines (1-3) 📝] */

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_1 = false;
// Assign the text to the line.
TEXT_LINE_1         = "Scan me if lost";
//Set the text size.
SIZE_TEXT_LINE_1    = 33;// [1:1:200]

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_2 = false;
// Assign the text to the line.
TEXT_LINE_2         = "";
//Set the text size.
SIZE_TEXT_LINE_2    = 33;// [1:1:200]


// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_3 = false;
// Assign the text to the line.
TEXT_LINE_3         = "";
//Set the text size.
SIZE_TEXT_LINE_3    = 26;// [1:1:200]





/* [QR Code 🔲️] */

// Hide the QR code.
HIDE_QR             = false;

// Select the action you want your QR code to perform.
QR_ACTION = "URL";// [Tx:DISPLAY A TEXT, URL:OPEN A WEBSITE, Wa:SEND ME A MESSAGE ON WHATSAPP, Te:SEND ME A MESSAGE ON TELEGRAM, Email:SEND ME AN EMAIL, SMS:SEND ME AN SMS, Call:CALL ME]

// Use this for Text, Website, Address, Etc.
Text = "https://bag-tag.de/0dec31a2-0f56-4aab-b5fe-f8c4c52cc749"; // 128

// Use this for Whatsapp, Telegram, SMS and Call.
Phone_Number = "+341234567890"; // 30

// Use this only for Email.
Email  = "Your_Email@mail.com"; // 30

// Change the QR size. (mm)
QR_SIZE             = 44;//[1:1:100]

//Horizontal and vertical QR alignment
QR_LOCATION         = [-3,0]; //[-200:0.5:200]

/* [Style 🖌️] */

//Set the tag color.
TAG_COLOR           = "#2B303A"; // color
//Set the text color.
TEXT_COLOR          = "#92DCE5"; // color
//Set the QR color.
QR_COLOR            = "#92DCE5"; // color
//Set the font family.
FONT_NAME           = "HarmonyOS Sans SC"; //[Anton, Archivo Black, Asap, Bangers, Black Han Sans, Bubblegum Sans, Bungee, Changa One, Chewy, Concert One, Fruktur, Gochi Hand, Griffy, HarmonyOS Sans SC, Inter, Inter Tight, Itim, Jockey One, Kanit, Kavoon, Komikazoom, Lato, Liberation Sans, Lilita One, Lobster, Lora, Luckiest Guy, Merriweather, Merriweather Sans, Mitr, Montserrat, Montserrat Alternates, Montserrat Subrayada, Nanum Pen, Norwester, Noto Sans, Noto Emoji, Noto Sans SC, Nunito, Nunito Sans, Open Sans, Open Sans Condensed, Orbitron, Oswald, Palanquin Dark, Passion One, Patrick Hand, Paytone One, Permanent Marker, Playfair Display, Playfair Display SC, Plus Jakarta Sans, PoetsenOne, Poppins, Rakkas, Raleway, Raleway Dots, Roboto, Roboto Condensed, Roboto Flex, Roboto Mono, Roboto Serif, Roboto Slab, Russo One, Saira Stencil One, Shrikhand, Source Sans 3, Spicy Rice, Squada One, Titan One, Ubuntu, Ubuntu Condensed, Ubuntu Mono, Ubuntu Sans, Ubuntu Sans Mono, Work Sans ]
//Set the font style.
FONT_STYLE          = "Bold"; // [Regular,Black,Bold,ExtraBol,ExtraLight,Light,Medium,SemiBold,Thin,Italic,Black Italic,Bold Italic,ExtraBold Italic,ExtraLight Italic,Light Italic,Medium Italic,SemiBold Italic,Thin Italic]
//Set the margin left.


/* [Extra Text Lines (4-9) 📋] */

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_4 = false;
// Assign the text to the line.
TEXT_LINE_4         = "+49 151647 086 14";
//Set the text size.
SIZE_TEXT_LINE_4    = 23;// [1:1:200]

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_5 = false;
// Assign the text to the line.
TEXT_LINE_5         = "1234567890";
//Set the text size.
SIZE_TEXT_LINE_5    = 33;// [1:1:200]

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_6 = false;
// Assign the text to the line.
TEXT_LINE_6         = "Phone number";
//Set the text size.
SIZE_TEXT_LINE_6    = 20;// [1:1:200]

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_7 = false;
// Assign the text to the line.
TEXT_LINE_7         = "Country, Zip code";
//Set the text size.
SIZE_TEXT_LINE_7    = 20;// [1:1:200]

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_8 = false;
// Assign the text to the line.
TEXT_LINE_8         = "Address";
//Set the text size.
SIZE_TEXT_LINE_8    = 20;// [1:1:200]

// Replace the text with an emoji and enable the toggle to show it.
ENABLE_EMOJIS_LINE_9 = false;
// Assign the text to the line.
TEXT_LINE_9         = "Email";
//Set the text size.
SIZE_TEXT_LINE_9    = 20;// [1:1:200]


/* [Text alignment (1-9) 📐] */

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_1 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_2 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_3 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_4 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_5 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_6 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_7 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_8 = [0,0]; //[-200:0.5:200]

//Horizontal and vertical alignment
TEXT_LOCATION_LINE_9 = [0,0]; //[-200:0.5:200]


/* [SVG Graphics ✒️] */

// Enable SVG icon
ENABLE_SVG      = true;
// SVG file ( https://www.svgrepo.com )
FILE            = "scan-nfc.svg";
// SVG Thickness (mm)
SVG_THICKNESS   = 0.5;// [0.5:0.5:10]
// SVG Size (mm)
SVG_SIZE        = 25;// [1:1:100]
//Horizontal and vertical SVG alignment
SVG_LOCATION    = [0,-10]; //[-200:0.5:200]
//Set the QR color.
SVG_COLOR       = "#92DCE5"; // color


/* [Experimental Configuration ⚙️] */

//Scale the tag on the X axis.
SCALE_TAG_X         = 0.35279;// [0:0.00001:1]

//Scale the tag on the Y axis.
SCALE_TAG_Y         = 0.35279;// [0:0.00001:1]

// Set the QR error correction level.
QR_ERROR_CORRECTION = "L";//[L:L (~7%), M:M (~15%), Q:Q (~25%), H:H (~30%)]

// Generates different patterns
QR_MASK             = 0; //[0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7]

// Increase this value if you experience issues with the flat surface option when using Bambu Studio.
FACEDOWN_THICKNESS  = 0.004;// [0.004:0.001:0.01]

/* [Hidden] */

// Constants
TAG_EXTRUDE         = Tag_Thickness;
QR_EXTRUDE          = (Facedown_Mode)? FACEDOWN_THICKNESS:QR_Thickness;
LINES_EXTRUDE       = (Facedown_Mode)? FACEDOWN_THICKNESS:Text_Thickness;
SVG_EXTRUDE         = (Facedown_Mode)? FACEDOWN_THICKNESS:SVG_THICKNESS;
QR_Z_POS            = TAG_EXTRUDE;
LINES_Z_POS         = TAG_EXTRUDE;
FONT_SCALE          = 0.154;
FONT                = str(FONT_NAME , ":style=", FONT_STYLE);
FONT_FAMILY_LINE_1  = (ENABLE_EMOJIS_LINE_1)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_2  = (ENABLE_EMOJIS_LINE_2)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_3  = (ENABLE_EMOJIS_LINE_3)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_4  = (ENABLE_EMOJIS_LINE_4)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_5  = (ENABLE_EMOJIS_LINE_5)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_6  = (ENABLE_EMOJIS_LINE_6)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_7  = (ENABLE_EMOJIS_LINE_7)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_8  = (ENABLE_EMOJIS_LINE_8)? str("Noto Emoji:style=Regular"):FONT;
FONT_FAMILY_LINE_9  = (ENABLE_EMOJIS_LINE_9)? str("Noto Emoji:style=Regular"):FONT;
TEXT_SPACING_LINE_1 = (ENABLE_EMOJIS_LINE_1)? 0.03:1;
TEXT_SPACING_LINE_2 = (ENABLE_EMOJIS_LINE_2)? 0.03:1;
TEXT_SPACING_LINE_3 = (ENABLE_EMOJIS_LINE_3)? 0.03:1;
TEXT_SPACING_LINE_4 = (ENABLE_EMOJIS_LINE_4)? 0.03:1;
TEXT_SPACING_LINE_5 = (ENABLE_EMOJIS_LINE_5)? 0.03:1;
TEXT_SPACING_LINE_6 = (ENABLE_EMOJIS_LINE_6)? 0.03:1;
TEXT_SPACING_LINE_7 = (ENABLE_EMOJIS_LINE_7)? 0.03:1;
TEXT_SPACING_LINE_8 = (ENABLE_EMOJIS_LINE_8)? 0.03:1;
TEXT_SPACING_LINE_9 = (ENABLE_EMOJIS_LINE_9)? 0.03:1;

if(ENABLE_SVG){
    translate([SVG_LOCATION[0], -SVG_LOCATION[1], TAG_EXTRUDE]) color(SVG_COLOR)
        linear_extrude(height = SVG_EXTRUDE) 
            resize([SVG_SIZE,0,0], true)
                import (FILE, center = true);
}


// Bezier calculation functions
function BEZ03(u) = pow((1-u), 3);
function BEZ13(u) = 3*u*(pow((1-u),2));
function BEZ23(u) = 3*(pow(u,2))*(1-u);
function BEZ33(u) = pow(u,3);

function bezier_2D_point(p0, p1, p2, p3, u) = [
    BEZ03(u)*p0[0] + BEZ13(u)*p1[0] + BEZ23(u)*p2[0] + BEZ33(u)*p3[0], 
    BEZ03(u)*p0[1] + BEZ13(u)*p1[1] + BEZ23(u)*p2[1] + BEZ33(u)*p3[1]
];

function bezier_coordinates(points, steps) = [
    for (c = points)
        for (step = [0:steps])
            bezier_2D_point(c[0], c[1], c[2], c[3], step/steps)
];

// Define the path data for QR_Only Tag
QR_OUTER_PATH = [
    [[156.25, -31.46], [156.25, -31.46], [127.22, -2.49], [127.22, -2.49]], [[127.22, -2.49], [125.63, -0.9000000000000001], [123.46, 0.0], [121.21, 0.0]], [[121.21, 0.0], [121.21, 0.0], [37.5, 0.0], [37.5, 0.0]], [[37.5, 0.0], [35.27, 0.0], [33.12, -0.88], [31.53, -2.44]], [[31.53, -2.44], [20.39, -13.39], [13.44, -20.5], [2.49, -31.46]], [[2.49, -31.46], [0.9, -33.05], [0.0, -35.21], [0.0, -37.46]], [[0.0, -37.46], [0.0, -37.46], [0.0, -178.6], [0.0, -178.6]], [[0.0, -178.6], [0.0, -183.29], [3.81, -187.09], [8.5, -187.09]], [[8.5, -187.09], [8.5, -187.09], [150.23, -187.09], [150.23, -187.09]], [[150.23, -187.09], [154.92999999999998, -187.09], [158.73, -183.29], [158.73, -178.6]], [[158.73, -178.6], [158.73, -178.6], [158.73, -37.46], [158.73, -37.46]], [[158.73, -37.46], [158.73, -35.21], [157.82999999999998, -33.05], [156.23999999999998, -31.46]], [[156.23999999999998, -31.46], [156.23999999999998, -31.46], [156.25, -31.46], [156.25, -31.46]], [[156.25, -31.46], [156.25, -31.46], [156.25, -31.46], [156.25, -31.46]]   
];
        
QR_INNER_PATH = [
    [[112.44, -29.84], [112.44, -29.84], [46.3, -29.84], [46.3, -29.84]], [[46.3, -29.84], [42.65, -29.84], [39.69, -26.67], [39.69, -22.75]], [[39.69, -22.75], [39.69, -18.83], [42.65, -15.66], [46.3, -15.66]], [[46.3, -15.66], [46.3, -15.66], [112.44, -15.66], [112.44, -15.66]], [[112.44, -15.66], [116.09, -15.66], [119.05, -18.83], [119.05, -22.75]], [[119.05, -22.75], [119.05, -26.67], [116.09, -29.84], [112.44, -29.84]], [[112.44, -29.84], [112.44, -29.84], [112.44, -29.84], [112.44, -29.84]], [[112.44, -29.84], [112.44, -29.84], [112.44, -29.84], [112.44, -29.84]]   
];
        
// Define the path data for Small Tag
S_OUTER_PATH = [
    [[156.25, -31.53], [156.25, -31.53], [127.22, -2.49], [127.22, -2.49]], [[127.22, -2.49], [125.63, -0.9000000000000001], [123.46, 0.0], [121.21, 0.0]], [[121.21, 0.0], [121.21, 0.0], [37.5, 0.0], [37.5, 0.0]], [[37.5, 0.0], [35.27, 0.0], [33.12, -0.88], [31.53, -2.45]], [[31.53, -2.45], [20.39, -13.42], [13.44, -20.54], [2.49, -31.52]], [[2.49, -31.52], [0.9, -33.12], [0.0, -35.28], [0.0, -37.54]], [[0.0, -37.54], [0.0, -37.54], [0.0, -274.97], [0.0, -274.97]], [[0.0, -274.97], [0.0, -279.67], [3.81, -283.47], [8.5, -283.47]], [[8.5, -283.47], [8.5, -283.47], [150.23, -283.47], [150.23, -283.47]], [[150.23, -283.47], [154.92999999999998, -283.47], [158.73, -279.66], [158.73, -274.97]], [[158.73, -274.97], [158.73, -274.97], [158.73, -37.54], [158.73, -37.54]], [[158.73, -37.54], [158.73, -35.28], [157.82999999999998, -33.12], [156.23999999999998, -31.53]], [[156.23999999999998, -31.53], [156.23999999999998, -31.53], [156.25, -31.53], [156.25, -31.53]], [[156.25, -31.53], [156.25, -31.53], [156.25, -31.53], [156.25, -31.53]]
];

S_INNER_PATH = [
    [[112.44, -30.03], [112.44, -30.03], [46.3, -30.03], [46.3, -30.03]], [[46.3, -30.03], [42.65, -30.03], [39.69, -26.86], [39.69, -22.94]], [[39.69, -22.94], [39.69, -19.020000000000003], [42.65, -15.850000000000001], [46.3, -15.850000000000001]], [[46.3, -15.850000000000001], [46.3, -15.850000000000001], [112.44, -15.850000000000001], [112.44, -15.850000000000001]], [[112.44, -15.850000000000001], [116.09, -15.850000000000001], [119.05, -19.020000000000003], [119.05, -22.94]], [[119.05, -22.94], [119.05, -26.86], [116.09, -30.03], [112.44, -30.03]], [[112.44, -30.03], [112.44, -30.03], [112.44, -30.03], [112.44, -30.03]], [[112.44, -30.03], [112.44, -30.03], [112.44, -30.03], [112.44, -30.03]]
];
     
// Define the path data for Medium Tag   
M_OUTER_PATH = [
    [[156.25, -31.5], [156.25, -31.5], [127.22, -2.49], [127.22, -2.49]], [[127.22, -2.49], [125.63, -0.9000000000000001], [123.46, 0.0], [121.21, 0.0]], [[121.21, 0.0], [121.21, 0.0], [37.5, 0.0], [37.5, 0.0]], [[37.5, 0.0], [35.27, 0.0], [33.12, -0.88], [31.53, -2.44]], [[31.53, -2.44], [20.39, -13.4], [13.44, -20.52], [2.49, -31.5]], [[2.49, -31.5], [0.9, -33.09], [0.0, -35.25], [0.0, -37.5]], [[0.0, -37.5], [0.0, -37.5], [0.0, -331.66], [0.0, -331.66]], [[0.0, -331.66], [0.0, -336.35], [3.81, -340.16], [8.5, -340.16]], [[8.5, -340.16], [8.5, -340.16], [150.23, -340.16], [150.23, -340.16]], [[150.23, -340.16], [154.92999999999998, -340.16], [158.73, -336.36], [158.73, -331.66]], [[158.73, -331.66], [158.73, -331.66], [158.73, -37.5], [158.73, -37.5]], [[158.73, -37.5], [158.73, -35.25], [157.82999999999998, -33.09], [156.23999999999998, -31.490000000000002]], [[156.23999999999998, -31.490000000000002], [156.23999999999998, -31.490000000000002], [156.25, -31.5], [156.25, -31.5]], [[156.25, -31.5], [156.25, -31.5], [156.25, -31.5], [156.25, -31.5]]     
];
M_INNER_PATH = [
    [[112.44, -29.88], [112.44, -29.88], [46.3, -29.88], [46.3, -29.88]], [[46.3, -29.88], [42.65, -29.88], [39.69, -26.71], [39.69, -22.79]], [[39.69, -22.79], [39.69, -18.869999999999997], [42.65, -15.7], [46.3, -15.7]], [[46.3, -15.7], [46.3, -15.7], [112.44, -15.7], [112.44, -15.7]], [[112.44, -15.7], [116.09, -15.7], [119.05, -18.869999999999997], [119.05, -22.79]], [[119.05, -22.79], [119.05, -26.71], [116.09, -29.88], [112.44, -29.88]], [[112.44, -29.88], [112.44, -29.88], [112.44, -29.88], [112.44, -29.88]], [[112.44, -29.88], [112.44, -29.88], [112.44, -29.88], [112.44, -29.88]]
];
        
// Define the path data for Large Tag   
L_OUTER_PATH = [
    [[156.25, -31.47], [156.25, -31.47], [127.22, -2.49], [127.22, -2.49]], [[127.22, -2.49], [125.63, -0.9000000000000001], [123.46, 0.0], [121.21, 0.0]], [[121.21, 0.0], [121.21, 0.0], [37.5, 0.0], [37.5, 0.0]], [[37.5, 0.0], [35.27, 0.0], [33.12, -0.88], [31.53, -2.44]], [[31.53, -2.44], [20.39, -13.39], [13.44, -20.51], [2.49, -31.47]], [[2.49, -31.47], [0.9, -33.06], [0.0, -35.22], [0.0, -37.47]], [[0.0, -37.47], [0.0, -37.47], [0.0, -388.36], [0.0, -388.36]], [[0.0, -388.36], [0.0, -393.05], [3.81, -396.85], [8.5, -396.85]], [[8.5, -396.85], [8.5, -396.85], [150.23, -396.85], [150.23, -396.85]], [[150.23, -396.85], [154.92999999999998, -396.85], [158.73, -393.05], [158.73, -388.36]], [[158.73, -388.36], [158.73, -388.36], [158.73, -37.48], [158.73, -37.48]], [[158.73, -37.48], [158.73, -35.23], [157.82999999999998, -33.06999999999999], [156.23999999999998, -31.479999999999997]], [[156.23999999999998, -31.479999999999997], [156.23999999999998, -31.479999999999997], [156.25, -31.47], [156.25, -31.47]], [[156.25, -31.47], [156.25, -31.47], [156.25, -31.47], [156.25, -31.47]]     
];
L_INNER_PATH = [
    [[112.44, -29.72], [112.44, -29.72], [46.3, -29.72], [46.3, -29.72]], [[46.3, -29.72], [42.65, -29.72], [39.69, -26.549999999999997], [39.69, -22.63]], [[39.69, -22.63], [39.69, -18.71], [42.65, -15.54], [46.3, -15.54]], [[46.3, -15.54], [46.3, -15.54], [112.44, -15.54], [112.44, -15.54]], [[112.44, -15.54], [116.09, -15.54], [119.05, -18.71], [119.05, -22.63]], [[119.05, -22.63], [119.05, -26.549999999999997], [116.09, -29.72], [112.44, -29.72]], [[112.44, -29.72], [112.44, -29.72], [112.44, -29.72], [112.44, -29.72]], [[112.44, -29.72], [112.44, -29.72], [112.44, -29.72], [112.44, -29.72]]
];

module bezier_polygon(points) {
    color(TAG_COLOR) linear_extrude(height=TAG_EXTRUDE) {
        scale([SCALE_TAG_X, SCALE_TAG_Y, 1]) {
            polygon(bezier_coordinates(points, 30));
        }
    }
}

module create_tag_shape(outer_path, inner_path) {
    difference() {
        bezier_polygon(outer_path);
        bezier_polygon(inner_path);
    }
}

module CreateBaseTag(Tag_Size) {
    if (Tag_Size == "QR") {

        // QR Only Tag implementation
        if(HIDE_TAG){}else{
            create_tag_shape(QR_OUTER_PATH, QR_INNER_PATH);}

        // Add QR
        if(HIDE_QR){}else{
            translate([QR_LOCATION[0]+6, QR_LOCATION[1]-60, QR_Z_POS]){ CreateQR(QR_ACTION); }}
        
    } else if (Tag_Size == "S") {
        // Small Tag implementation
        if(HIDE_TAG){}else{
            create_tag_shape(S_OUTER_PATH, S_INNER_PATH);}
        
        // Add QR
        if(HIDE_QR){}else{
            translate([QR_LOCATION[0]+6, QR_LOCATION[1]-94, QR_Z_POS]){ CreateQR(QR_ACTION); }}
        
    } else if (Tag_Size == "M") {
        // Medium Tag implementation
        if(HIDE_TAG){}else{
            create_tag_shape(M_OUTER_PATH, M_INNER_PATH);}
        
        // Add QR
        if(HIDE_QR){}else{
            translate([QR_LOCATION[0]+6, QR_LOCATION[1]-114, QR_Z_POS]){ CreateQR(QR_ACTION); }}
        
    } else if (Tag_Size == "L") {
        // Large Tag implementation
        if(HIDE_TAG){}else{
            create_tag_shape(L_OUTER_PATH, L_INNER_PATH);}
        
        // Add QR
        if(HIDE_QR){}else{
            translate([QR_LOCATION[0]+6, QR_LOCATION[1]-134, QR_Z_POS]){ CreateQR(QR_ACTION); }}
        
    } else {
        echo("Invalid tag size specified");
    }
    
    // Add text to Tag       
    if(ADD_TEXT_LINE_1){ TextExtrude(TEXT_LOCATION_LINE_1[0]+5.5, -TEXT_LOCATION_LINE_1[1]-25, TAG_EXTRUDE, TEXT_LINE_1, TEXT_COLOR, SIZE_TEXT_LINE_1, FONT_FAMILY_LINE_1, TEXT_SPACING_LINE_1); }
    
    if(ADD_TEXT_LINE_2){ TextExtrude(TEXT_LOCATION_LINE_2[0]+0.5, -TEXT_LOCATION_LINE_2[1]+-112, TAG_EXTRUDE, TEXT_LINE_2, TEXT_COLOR, SIZE_TEXT_LINE_2, FONT_FAMILY_LINE_2, TEXT_SPACING_LINE_2); }
    
    if(ADD_TEXT_LINE_3){ TextExtrude(TEXT_LOCATION_LINE_3[0]+5.5, -TEXT_LOCATION_LINE_3[1]-38, TAG_EXTRUDE, TEXT_LINE_3, TEXT_COLOR, SIZE_TEXT_LINE_3, FONT_FAMILY_LINE_3, TEXT_SPACING_LINE_3); }

    if(ADD_TEXT_LINE_4){ TextExtrude(TEXT_LOCATION_LINE_4[0]+5.5, -TEXT_LOCATION_LINE_4[1]-50, TAG_EXTRUDE, TEXT_LINE_4, TEXT_COLOR, SIZE_TEXT_LINE_4, FONT_FAMILY_LINE_4, TEXT_SPACING_LINE_4); }
    if(ADD_TEXT_LINE_5){ TextExtrude(TEXT_LOCATION_LINE_5[0]+5.5, -TEXT_LOCATION_LINE_5[1]-57, TAG_EXTRUDE, TEXT_LINE_5, TEXT_COLOR, SIZE_TEXT_LINE_5, FONT_FAMILY_LINE_5, TEXT_SPACING_LINE_5); }
    if(ADD_TEXT_LINE_6){ TextExtrude(TEXT_LOCATION_LINE_6[0]+5.5, -TEXT_LOCATION_LINE_6[1]-63, TAG_EXTRUDE, TEXT_LINE_6, TEXT_COLOR, SIZE_TEXT_LINE_6, FONT_FAMILY_LINE_6, TEXT_SPACING_LINE_6); }

    if(ADD_TEXT_LINE_7){ TextExtrude(TEXT_LOCATION_LINE_7[0]+5.5, -TEXT_LOCATION_LINE_7[1]-73, TAG_EXTRUDE, TEXT_LINE_7, TEXT_COLOR, SIZE_TEXT_LINE_7, FONT_FAMILY_LINE_7, TEXT_SPACING_LINE_7); }
    if(ADD_TEXT_LINE_8){ TextExtrude(TEXT_LOCATION_LINE_8[0]+5.5, -TEXT_LOCATION_LINE_8[1]-78, TAG_EXTRUDE, TEXT_LINE_8, TEXT_COLOR, SIZE_TEXT_LINE_8, FONT_FAMILY_LINE_8, TEXT_SPACING_LINE_8); }
    if(ADD_TEXT_LINE_9){ TextExtrude(TEXT_LOCATION_LINE_9[0]+5.5, -TEXT_LOCATION_LINE_9[1]-83, TAG_EXTRUDE, TEXT_LINE_9, TEXT_COLOR, SIZE_TEXT_LINE_9, FONT_FAMILY_LINE_9, TEXT_SPACING_LINE_9); }
    
}

module CreateQR(QR_ACTION){
    QrMessage = (QR_ACTION == "Tx")?      str(Text)
              : (QR_ACTION == "URL")?     str(Text)
              : (QR_ACTION == "Wa")?      str("https://wa.me/", Phone_Number)
              : (QR_ACTION == "Te")?      str("https://t.me/", Phone_Number)
              : (QR_ACTION == "Email")?   str("MATMSG:TO:", Email,";SUB:Luggage found;")
              : (QR_ACTION == "SMS")?     str("SMSTO:",Phone_Number,":") 
              : (QR_ACTION == "Call")?    qr_phone_call(Phone_Number) : "Invalid qr type specified";
    translate([0,-4,0])







    color(QR_COLOR) qr(QrMessage, error_correction=QR_ERROR_CORRECTION, width=QR_SIZE, height=QR_SIZE, thickness=QR_EXTRUDE, center=false, mask_pattern=QR_MASK, encoding="UTF-8");
}

module TextExtrude(X, Y, Z, Text, Color, FontSize, FontFamily, TextSpacing){   
    translate([X, Y, Z]){
        color(Color) linear_extrude(height = LINES_EXTRUDE)
        text(Text, font = FontFamily, size = FontSize * FONT_SCALE, halign = "left", spacing = TextSpacing);
    }
}
module nfcHole()
{
    translate([28,-40,3.5])
    linear_extrude(0.25)
    circle(14);
}
// Create Tag
translate([-28, 50]) { 
    difference(){
        CreateBaseTag(Tag_Size);
        nfcHole();
    }
    }

rotate([00,0,90])
TextExtrude(-45,-25,5, "https://bag-tag.de", TEXT_COLOR,SIZE_TEXT_LINE_7, FONT_FAMILY_LINE_7,TEXT_SPACING_LINE_7);

//
// Automatically generated by generate.py.
// DO NOT EDIT!!!
// Source files are in the src/ directory.
//

//
//   ########                        ##   #######    #######  
//  ##//////                        /##  ##/////##  /##////## 
// /##         #####   ######       /## ##     //## /##   /## 
// /######### ##///## //////##   ######/##      /## /#######  
// ////////##/##  //   #######  ##///##/##    ##/## /##///##  
//        /##/##   ## ##////## /##  /##//##  // ##  /##  //## 
//  ######## //##### //########//###### //####### ##/##   //##
// ////////   /////   ////////  //////   /////// // //     // 
//
// Effortlessly generate QR codes directly in OpenSCAD
// https://github.com/xypwn/scadqr
//
// Copyright (c) 2024 Darwin Schuppan and contributors. All rights reserved.
//
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.

// BEGIN src/qr.scad

//
// Public API
//

//@PUBLIC

// Generates a QR code encoding plain text.
// error_correction: options: "L" (~7%), "M" (~15%), "Q" (~25%) or "H" (~30%)
// thickness: thickness or 0 for 2D
// mask_pattern: range: 0-7
// encoding: options: "UTF-8" (Unicode) or "Shift_JIS" (Shift Japanese International Standards)
module qr(message, error_correction="M", width=100, height=100, thickness=1, center=false, mask_pattern=0, encoding="UTF-8") 
    qr_custom(message, error_correction, width, height, thickness, center, mask_pattern, encoding) {
        _qr_default_module();
        _qr_default_position_pattern();
        _qr_default_alignment_pattern();
}

// Generates a QR code using custom elements.
// Child elements (2D, origin: [0,0], must extend into positive XY, 1 module = 1mm):
// - `children(0)`: Module (black pixel)
// - `children(1)`: Position pattern
// - `children(2)`: Alignment pattern
// error_correction: options: "L" (~7%), "M" (~15%), "Q" (~25%) or "H" (~30%)
// thickness: thickness or 0 for 2D
// mask_pattern: range: 0-7
// encoding: options: "UTF-8" (Unicode) or "Shift_JIS" (Shift Japanese International Standards)
module qr_custom(message, error_correction="M", width=100, height=100, thickness=1, center=false, mask_pattern=0, encoding="UTF-8") {
    ec_lvl =
        error_correction == "L" ? _qr_EC_L :
        error_correction == "M" ? _qr_EC_M :
        error_correction == "Q" ? _qr_EC_Q :
        error_correction == "H" ? _qr_EC_H :
        undef;
    assert(ec_lvl >= _qr_EC_L && ec_lvl <= _qr_EC_H, "error_correction must be \"L\", \"M\", \"Q\" or \"H\"");

    enc =
        encoding == "Shift_JIS" ? _qr_ENC_SJIS :
        encoding == "UTF-8" ? _qr_ENC_UTF8 :
        undef;
    assert(enc >= _qr_ENC_SJIS && enc <= _qr_ENC_UTF8, "encoding must be \"UTF-8\" or \"Shift_JIS\"");

    message_bytes = _qr_str2bytes(message);

    ver = _qr_get_version(len(message_bytes), ec_lvl, enc);
    size = _qr_version2size(ver);

    bits = _qr_encode_message(message_bytes, ec_lvl, mask_pattern, ver, enc);

    positions = _qr_data_bit_positions(size);

    translate(center ? [-width/2, -height/2, 0] : [0,0,0])
    _qr_extrude_or_2d(thickness)
    scale([width/size, height/size]) {
        // Position patterns
        for(i=[[0,6],[size-7,6],[0,size-1]])
            translate([i[0], size-1-i[1], 0])
            children(1);
        // Timing patterns
        for(x=[8:size-1-8])
            if (x%2 == 0)
            _qr_module_1(size, x, 6) children(0);
        for(y=[8:size-1-8])
            if (y%2 == 0)
            _qr_module_1(size, 6, y) children(0);
        // Alignment patterns
        if (ver >= 2) {
            n_pats = _qr_n_alignment_patterns(ver);
            pat_step = _qr_alignment_pattern_step(ver);
            pat_last = size-1-6;
            pat_coords = concat([6], [
                for(i=[0:max(0, n_pats-2)]) pat_last-i*pat_step
            ]);
            for(y=pat_coords,x=pat_coords)
                if (!(
                    (x == 6 && y == 6) ||
                    (x == 6 && y == pat_last) ||
                    (x == pat_last && y == 6)
                ))
                translate([x-2, size-1-y-2, 0])
                children(2);
        }
        // Version information
        if(ver >= 7) {
            verinf = _qr_verinf_bits(ver);
            for(i=[0:17])
                if (verinf[17-i])
                _qr_module_1(size, floor(i/3), size-11+i%3) children(0);
            for(i=[0:17])
                if (verinf[17-i])
                _qr_module_1(size, size-11+i%3, floor(i/3)) children(0);
        }
        // Format info
        fmtinf = _qr_fmtinf_bits(ec_lvl, mask_pattern);
        for(i=[0:7])
            if (fmtinf[14-i])
            _qr_module_1(size, 8, i <= 5 ? i : i+1) children(0);;
        for(i=[8:14])
            if (fmtinf[14-i])
            _qr_module_1(size, 15-(i <= 8 ? i : i+1), 8) children(0);;
        for(i=[0:7])
            if (fmtinf[14-i])
            _qr_module_1(size, size-1-i, 8) children(0);;
        for(i=[8:14])
            if (fmtinf[14-i])
            _qr_module_1(size, 8, size-1-6+i-8) children(0);;
        _qr_module_1(size, 8, size-1-7) children(0);;
        // Modules
        for(p=positions) {
            x = p[0];
            y = p[1];
            i = p[2];
            val = _qr_apply_mask_pattern(
                bits[i],
                x, y, mask_pattern
            );
            if (val)
                _qr_module_1(size, x, y) children(0);
        }
    }
}

// Returns the length of one side of the QR code (in modules/squares).
// error_correction: options: "L" (~7%), "M" (~15%), "Q" (~25%) or "H" (~30%)
// encoding: options: "UTF-8" (Unicode) or "Shift_JIS" (Shift Japanese International Standards)
function qr_size(message, error_correction="M", encoding="UTF-8") = 
    _qr_version2size(qr_version(message, error_correction, encoding));

// Returns the version of a QR code (1 <= version <= 40; version dictates the size).
// error_correction: options: "L" (~7%), "M" (~15%), "Q" (~25%) or "H" (~30%)
// encoding: options: "UTF-8" (Unicode) or "Shift_JIS" (Shift Japanese International Standards)
function qr_version(message, error_correction="M", encoding="UTF-8") = 
    let(ec_lvl =
        error_correction == "L" ? _qr_EC_L :
        error_correction == "M" ? _qr_EC_M :
        error_correction == "Q" ? _qr_EC_Q :
        error_correction == "H" ? _qr_EC_H :
        undef)
    assert(ec_lvl >= _qr_EC_L && ec_lvl <= _qr_EC_H, "error_correction must be \"L\", \"M\", \"Q\" or \"H\"")
    let(enc =
        encoding == "Shift_JIS" ? _qr_ENC_SJIS :
        encoding == "UTF-8" ? _qr_ENC_UTF8 :
        undef)
    assert(enc >= _qr_ENC_SJIS && enc <= _qr_ENC_UTF8, "encoding must be \"UTF-8\" or \"Shift_JIS\"")
    _qr_get_version(_qr_str_num_bytes(message), ec_lvl, enc);

// Generates a 'connect to wifi' message which can be input into qr().
// ssid: network name
// psk: network password
// auth: options: "nopass" (open network), "WPA" (WPA password protection), "WEP" (WEP password protection; obsolete)
// hidden: whether network is hidden
function qr_wifi(ssid, psk, auth="WPA", hidden=false) =
    (auth != "nopass" && auth != "WPA" && auth != "WEP") ? undef :
    str("WIFI:T:", auth, ";S:", ssid, ";P:", psk, ";", hidden ? "H:true" : "", ";");

// Generates a 'make a phone call' message which can be input into qr().
function qr_phone_call(number) =
    str("TEL:", number);

// Generates a VCard containing contact info which can be input into qr().
// Only a basic subset of VCard is implemented.
// If applicable, multiple entries must be separated by commas (e.g. middlenames, nameprefixes...).
// lastname: last name
// firstname: first name
// middlenames: additional first names
// nameprefixes: honorific prefixes
// namesuffixes: honorific suffixes
// customfullname: full name, leave blank to automatically generate
// email: email address
// url: website or other URL
// phone: phone number
// address: street address
// ext_address: extended address (e.g. apartment or suite number)
// city: city name
// region: region (e.g. state or province)
// postalcode: postal code
// country: full country name
function qr_vcard(lastname, firstname, middlenames="", nameprefixes="", namesuffixes="", customfullname="", email="", url="", phone="", address="", ext_address="", city="", region="", postalcode="", country="") =
    let (fullname = customfullname ? customfullname :
        _qr_strjoin(
            [ for (s=[nameprefixes, firstname, middlenames, lastname, namesuffixes]) if (s != "") s ],
            delim=" "
        ))
    str(
        "BEGIN:VCARD\n",
        "VERSION:3.0\n",
        "N:",lastname,";",firstname,";",middlenames,";",nameprefixes,";",namesuffixes,"\n",
        "FN:",fullname,"\n",
        email ?
            str("EMAIL;type=PREF,INTERNET:",email,"\n") : "",
        url ?
            str("URL:",url,"\n") : "",
        phone ?
            str("TEL:",phone,"\n") : "",
        (address || ext_address || city || region || postalcode || country) ?
            str("ADR;TYPE=HOME:",";",ext_address,";",address,";",city,";",region,";",postalcode,";",country,"\n") : "",
        "END:VCARD\n"
    );

// Generates a VCalendar event which can be input into qr().
// summary: short event description
// description: event description
// location: location name
// start_datetime: start date time UTC string, can be generated using qr_vevent_datetime()
// end_datetime: end date time UTC string, can be generated using qr_vevent_datetime()
function qr_vevent(summary="", description="", location="", start_datetime, end_datetime) =
    str(
        "BEGIN:VCALENDAR\n",
        "VERSION:2.0\n",
        "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n",
        "BEGIN:VEVENT\n",
        summary ?
            str("SUMMARY:", summary, "\n") : "",
        description ?
            str("DESCRIPTION:", description, "\n") : "",
        location ?
            str("LOCATION:", location, "\n") : "",
        "DTSTAMP:", start_datetime, "\n",
        "DTSTART:", start_datetime, "\n",
        "DTEND:", end_datetime, "\n",
        "END:VEVENT\n",
        "END:VCALENDAR\n"
    );

// Generates a UTC datetime string to be input into qr_vevent.
function qr_vevent_datetime(year, month, day, hour, minute, second) =
    str(
        _qr_padstr(str(year), "0", 4), _qr_padstr(str(month), "0", 2), _qr_padstr(str(day), "0", 2), "T",
        _qr_padstr(str(hour), "0", 2), _qr_padstr(str(minute), "0", 2), _qr_padstr(str(second), "0", 2), "Z"
    );

//@PRIVATE

//
// Misc helper functions
//
function _qr_padstr(s, ch, pad, acc="") =
    len(acc) >= pad-len(s) ?
    str(acc, s) :
    _qr_padstr(s, ch, pad, str(acc, ch));

//
// QR code helper modules
//
module _qr_default_module() {
    square([1, 1]);
}

module _qr_default_position_pattern() union() {
    difference() {
        square(7);
        translate([1, 1])
            square(5);
    }
    translate([2, 2])
        square(3);
}

module _qr_default_alignment_pattern() union() {
    difference() {
        square(5);
        translate([1, 1])
            square(3);
    }
    translate([2, 2])
        square(1);
}

module _qr_module_1(size, x, y) {
    epsilon=0.0001; // ensures adjacent modules fuse together when rendering
    translate([x-epsilon, size-1-y-epsilon, 0])
        scale([1+2*epsilon, 1+2*epsilon, 1])
        children(0);
}

// Applies linear_extrude(thickness) only if thickness > 0
module _qr_extrude_or_2d(thickness) {
    if (thickness == 0) {
        children(0);
    } else {
        linear_extrude(thickness)
            children(0);
    }
}

function _qr_data_bit_positions(size, index=0, pos=undef, acc=[]) =
    let(nextpos=_qr_next_module_position(pos, size))
    nextpos == undef ? acc :
    let(app=concat([nextpos[0], nextpos[1]], index))
    _qr_data_bit_positions(size, index+1, nextpos, concat([app], acc));

//
// QR code general functions
//
// Error correction levels
_qr_EC_L = 0; // low      (7% recovery)
_qr_EC_M = 1; // medium   (15% recovery)
_qr_EC_Q = 2; // quartile (25% recovery)
_qr_EC_H = 3; // high     (30% recovery)

// Encodings supported by this library
_qr_ENC_SJIS = 0; // Shift Japanese International Standards (standard QR code encoding)
_qr_ENC_UTF8 = 1; // Unicode

function _qr_version2size(ver) = 17+4*ver;
function _qr_size2version(size) = (size-17)/4;

function _qr_do_get_version(msg_bytelen, ec_lvl, ver, encoding) =
    ver > 40 ? undef :
    _qr_get_max_msg_bytelen(ver, ec_lvl, encoding) >= msg_bytelen ?
        ver :
        _qr_do_get_version(msg_bytelen, ec_lvl, ver+1, encoding);

// Picks the right QR code size (called version) for
// the given message length and error correction level
function _qr_get_version(msg_bytelen, ec_lvl, encoding) =
    _qr_do_get_version(msg_bytelen, ec_lvl, 1, encoding);

// Applies one of the 7 mask patterns via XOR
function _qr_apply_mask_pattern(val, x, y, pat) =
    pat == 0 ?
        ((y + x) % 2 == 0 ? !val : val) : 
    pat == 1 ?
        (y % 2 == 0 ? !val : val) : 
    pat == 2 ?
        (x % 3 == 0 ? !val : val) : 
    pat == 3 ?
        ((y + x) % 3 == 0 ? !val : val) : 
    pat == 4 ?
        ((floor(y/2) + floor(x/3)) % 2 == 0 ? !val : val) : 
    pat == 5 ?
        (y*x % 2 + y*x % 3 == 0 ? !val : val) : 
    pat == 6 ?
        ((y*x % 2 + y*x % 3) % 2 == 0 ? !val : val) : 
    pat == 7 ?
        ((y*x%3 + y+x) % 2 == 0 ? !val : val) : 
    undef;

//
// QR code message encoding
//
function _qr_get_max_msg_bytelen(ver, ec_lvl, encoding) =
    let(maxbytes=_qr_ectab[ver-1][ec_lvl][0])
    let(msg_len_bytes=ver <= 9 ? 1 : 2)
    let(extra_bytes= // see _qr_data_codewords() for what these do
        encoding == _qr_ENC_SJIS ? 1 :
        encoding == _qr_ENC_UTF8 ? 2 :
        undef)
    maxbytes - msg_len_bytes - extra_bytes;

// Performs a gf2^8 finite field multiplication
function _qr_gf256_mul(a, b) =
    a == 0 || b == 0 ? 0 :
    _qr_gf256_exp[
        (_qr_gf256_log[a] + _qr_gf256_log[b]) % 255
    ];

// Performs gf2^8 polynomial long division of data_cws by gp
function _qr_do_ec_codewords(n, data_cws, gp, res, i) =
    i >= len(data_cws) ?
        res :
    let (lt = _qr_xor_byte(data_cws[i], res[0]))
    let (res = [ for(i=[1:len(res)-1]) res[i] ])
    let (res = concat(res, [0]))
    let (res = [ for(i=[0:n-1])
        _qr_xor_byte(res[i], _qr_gf256_mul(gp[i], lt))
    ])
    _qr_do_ec_codewords(n, data_cws, gp, res, i+1);

// Generates n error correction codewords for data_cws
function _qr_ec_codewords(n, data_cws) =
    _qr_do_ec_codewords(n, data_cws, _qr_generator_polynomials[n], [ for(i=[0:n]) 0 ], 0);

// Error correction patterns converted to decimal
_qr_ec_pats = [
    1,
    0,
    3,
    2
];

// Look up format info with error correction
function _qr_fmtinf_bits(ec_lvl, mask_pat) =
    // equivalent to: ec_lvl << 3 | mask_pat
    _qr_fmtinf_strs[_qr_ec_pats[ec_lvl] * _qr_pow2[3] + mask_pat];

// Look up version info bits
function _qr_verinf_bits(ver) =
    _qr_verinf_strs[ver-1];

// Pads bytes with add additional bytes
// The padding bytes alternate between the
// values 236 and 17
function _qr_pad_bytes(bytes, add) =
    [ for(i=[0:len(bytes)+add-1])
        i < len(bytes) ?
            bytes[i] :
        (i-len(bytes)) % 2 == 0 ? 236 : 17
    ];

// Encode msg as data codewords, including the header
// and padding
// Returns a byte stream
function _qr_data_codewords(msg_bytes, ec_lvl, ver, encoding) =
    let(max_msg_bytes=_qr_get_max_msg_bytelen(ver, ec_lvl, encoding))
    let(msg_len_bits=_qr_bytes2bits(ver <= 9 ?
        [ len(msg_bytes) ] :
        [ floor(len(msg_bytes)/_qr_pow2[8]), len(msg_bytes) ]))
    let(mode=
        encoding == _qr_ENC_SJIS ? [0,1,0,0] :
        encoding == _qr_ENC_UTF8 ? [0,1,1,1] :
        undef)
    let(eci_enc=
        encoding == _qr_ENC_SJIS ? [] :
        encoding == _qr_ENC_UTF8 ? _qr_bytes2bits([26]) :
        undef)
    let(eci_mode=
        encoding == _qr_ENC_SJIS ? [] :
        encoding == _qr_ENC_UTF8 ? [0,1,0,0] :
        undef)
    let(terminator=
        encoding == _qr_ENC_SJIS ? [0,0,0,0] :
        encoding == _qr_ENC_UTF8 ? (
            // the terminator may be omitted if the
            // message fits perfectly into the maximum
            // number of bytes
            len(msg_bytes) == max_msg_bytes ?
                [] : [0,0,0,0,0,0,0,0]
        ) :
        undef)
    let(bits=concat(
        mode,
        eci_enc,
        eci_mode,
        msg_len_bits,
        _qr_bytes2bits(msg_bytes),
        terminator
    ))
    let(pad_amt=max_msg_bytes
        -len(msg_bytes)
        -(len(terminator) == 8 ? 1 : 0))
    _qr_pad_bytes(_qr_bits2bytes(bits), pad_amt);

// Splits the data codewords into the appropriate blocks
function _qr_data_blocks(data_cws, ec_lvl, ver) =
    let(n_blocks_grp1=_qr_ectab[ver-1][ec_lvl][2])
    let(n_blocks_grp2=_qr_ectab[ver-1][ec_lvl][4])
    let(grp1_block_size=_qr_ectab[ver-1][ec_lvl][3])
    let(grp2_block_size=_qr_ectab[ver-1][ec_lvl][5])
    [ for(i=[0:n_blocks_grp1+n_blocks_grp2-1])
        let(block_offset=i < n_blocks_grp1 ?
            i*grp1_block_size :
            n_blocks_grp1*grp1_block_size + (i-n_blocks_grp1)*grp2_block_size)
        let(block_size=i < n_blocks_grp1 ? grp1_block_size : grp2_block_size)
        [ for(j=[0:block_size-1])
            data_cws[block_offset+j]
        ]];

function _qr_interleave_codewords(blocks) =
    [ for(i=[0:max([ for(b=blocks) len(b) ])-1])
        for(j=[0:len(blocks)-1])
            if(i < len(blocks[j]))
                blocks[j][i]
    ];

function _qr_ec_blocks(data_blocks, ec_lvl, ver) =
    let(ec_n=_qr_ectab[ver-1][ec_lvl][1])
    [ for(block=data_blocks)
        _qr_ec_codewords(ec_n, block) ];

// Get final encoded data including error
// correction as bits
function _qr_encode_message(msg_bytes, ec_lvl, mask_pattern, ver, encoding) =
    let(data_blocks=_qr_data_blocks(_qr_data_codewords(msg_bytes, ec_lvl, ver, encoding), ec_lvl, ver))
    let(data_cws=_qr_interleave_codewords(data_blocks))
    let(ec_blocks=_qr_ec_blocks(data_blocks, ec_lvl, ver))
    let(ec_cws=_qr_interleave_codewords(ec_blocks))
    concat(
        _qr_bytes2bits(data_cws), // data codewords
        _qr_bytes2bits(ec_cws) // error correction
    );


//
// QR code module placement
//
// Gets the maximum alignment patterns per row /
// column, NOT the overall total
function _qr_n_alignment_patterns(ver) =
    ver == 1 ? 0 :
    floor(ver/7)+2;

// Distance between alignment patterns
// (excluding the first one which is
// always at x=6)
function _qr_alignment_pattern_step(ver) =
    let(size=_qr_version2size(ver))
    let(n=_qr_n_alignment_patterns(ver))
    2*ceil((size-1-12)/(2*(n-1)));

// x can be either x or y; does not account
// for illegal positions
function _qr_coord_is_in_alignment_pattern(x, size) =
    let(ver=_qr_size2version(size))
    let(s=_qr_alignment_pattern_step(ver))
    ver == 1 ? false :
    (x >= 4 && x < 9) ||
    (
        (x > 6+2) &&
        ((s+size-1-6+2-x)%s) < 5
    );

function _qr_region_is_in_bounds(x, y, size) =
    x >= 0 && x < size &&
    y >= 0 && y < size;

function _qr_region_is_data(x, y, size) =
    _qr_region_is_in_bounds(x, y, size) &&
    // position squares and format info
    !(
        (x < 9 && y < 9) ||
        (x < 9 && y > size-9) ||
        (y < 9 && x > size-9)
    ) &&
    // version info
    !(
        size >= _qr_version2size(7) && (
            (x < 6 && y > size-12) ||
            (y < 6 && x > size-12)
        )
    ) &&
    // timing pattern
    !(x == 6 || y == 6) &&
    // alignment pattern
    !(
        size > _qr_version2size(1) &&
        !(
            // illegal position
            // for alignment patterns
            // (intersecting with
            // position pattern)
            (x == size-9 && y < 9) ||
            (y == size-9 && x < 9)
        ) &&
        (
            _qr_coord_is_in_alignment_pattern(x, size) &&
            _qr_coord_is_in_alignment_pattern(y, size)
        )
    );

// Finds the next free module starting
// from x, y while going in the y-direction
// ydir in a right-to-left zig-zag
function _qr_find_next_free_module(x, y, ydir, size, depth=0) =
    _qr_region_is_data(x, y, size) ? [x, y] :
    _qr_region_is_data(x-1, y, size) ? [x-1, y] :
    _qr_find_next_free_module(x, y+ydir, ydir, size, depth+1);

function _qr_next_module_position(prev, size, depth=0) =
    prev == undef ? [size-1, size-1] :
    let(eff_x=
        prev[0] < 6 ? prev[0] :
        prev[0]-1)
    let(ydir=
        eff_x % 4 < 2 ? 1 : -1)
    let(right=eff_x % 2 == 1)
    let(x=
        right ? prev[0]-1 : prev[0]+1)
    let(y=
        right ? prev[1] : prev[1] + ydir)
    !_qr_region_is_in_bounds(x, y, size) ? (
        x < 2 ? undef :
        let(x=
            x == 8 ? x-3 : x-2) // go 1 further left if module would collide with timing pattern
        _qr_find_next_free_module(x, y, -ydir, size)
    ) :
    !_qr_region_is_data(x, y, size) ? (
        _qr_region_is_data(x-1, y, size) ? [x-1, y] :
        _qr_next_module_position([x-1, y], size, depth+1)
    ) :
    [x, y];


// END src/qr.scad
// BEGIN src/bits.scad

//
// Bit operation utils (not specific to QR)
//
_qr_pow2=[1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];
_qr_char_nums = [[0,0],["\x01",1],["\x02",2],["\x03",3],["\x04",4],["\x05",5],["\x06",6],["\x07",7],["\x08",8],["\x09",9],["\x0a",10],["\x0b",11],["\x0c",12],["\x0d",13],["\x0e",14],["\x0f",15],["\x10",16],["\x11",17],["\x12",18],["\x13",19],["\x14",20],["\x15",21],["\x16",22],["\x17",23],["\x18",24],["\x19",25],["\x1a",26],["\x1b",27],["\x1c",28],["\x1d",29],["\x1e",30],["\x1f",31],["\x20",32],["\x21",33],["\x22",34],["\x23",35],["\x24",36],["\x25",37],["\x26",38],["\x27",39],["\x28",40],["\x29",41],["\x2a",42],["\x2b",43],["\x2c",44],["\x2d",45],["\x2e",46],["\x2f",47],["\x30",48],["\x31",49],["\x32",50],["\x33",51],["\x34",52],["\x35",53],["\x36",54],["\x37",55],["\x38",56],["\x39",57],["\x3a",58],["\x3b",59],["\x3c",60],["\x3d",61],["\x3e",62],["\x3f",63],["\x40",64],["\x41",65],["\x42",66],["\x43",67],["\x44",68],["\x45",69],["\x46",70],["\x47",71],["\x48",72],["\x49",73],["\x4a",74],["\x4b",75],["\x4c",76],["\x4d",77],["\x4e",78],["\x4f",79],["\x50",80],["\x51",81],["\x52",82],["\x53",83],["\x54",84],["\x55",85],["\x56",86],["\x57",87],["\x58",88],["\x59",89],["\x5a",90],["\x5b",91],["\x5c",92],["\x5d",93],["\x5e",94],["\x5f",95],["\x60",96],["\x61",97],["\x62",98],["\x63",99],["\x64",100],["\x65",101],["\x66",102],["\x67",103],["\x68",104],["\x69",105],["\x6a",106],["\x6b",107],["\x6c",108],["\x6d",109],["\x6e",110],["\x6f",111],["\x70",112],["\x71",113],["\x72",114],["\x73",115],["\x74",116],["\x75",117],["\x76",118],["\x77",119],["\x78",120],["\x79",121],["\x7a",122],["\x7b",123],["\x7c",124],["\x7d",125],["\x7e",126],["\x7f",127],["\u0080",128],["\u0081",129],["\u0082",130],["\u0083",131],["\u0084",132],["\u0085",133],["\u0086",134],["\u0087",135],["\u0088",136],["\u0089",137],["\u008a",138],["\u008b",139],["\u008c",140],["\u008d",141],["\u008e",142],["\u008f",143],["\u0090",144],["\u0091",145],["\u0092",146],["\u0093",147],["\u0094",148],["\u0095",149],["\u0096",150],["\u0097",151],["\u0098",152],["\u0099",153],["\u009a",154],["\u009b",155],["\u009c",156],["\u009d",157],["\u009e",158],["\u009f",159],["\u00a0",160],["\u00a1",161],["\u00a2",162],["\u00a3",163],["\u00a4",164],["\u00a5",165],["\u00a6",166],["\u00a7",167],["\u00a8",168],["\u00a9",169],["\u00aa",170],["\u00ab",171],["\u00ac",172],["\u00ad",173],["\u00ae",174],["\u00af",175],["\u00b0",176],["\u00b1",177],["\u00b2",178],["\u00b3",179],["\u00b4",180],["\u00b5",181],["\u00b6",182],["\u00b7",183],["\u00b8",184],["\u00b9",185],["\u00ba",186],["\u00bb",187],["\u00bc",188],["\u00bd",189],["\u00be",190],["\u00bf",191],["\u00c0",192],["\u00c1",193],["\u00c2",194],["\u00c3",195],["\u00c4",196],["\u00c5",197],["\u00c6",198],["\u00c7",199],["\u00c8",200],["\u00c9",201],["\u00ca",202],["\u00cb",203],["\u00cc",204],["\u00cd",205],["\u00ce",206],["\u00cf",207],["\u00d0",208],["\u00d1",209],["\u00d2",210],["\u00d3",211],["\u00d4",212],["\u00d5",213],["\u00d6",214],["\u00d7",215],["\u00d8",216],["\u00d9",217],["\u00da",218],["\u00db",219],["\u00dc",220],["\u00dd",221],["\u00de",222],["\u00df",223],["\u00e0",224],["\u00e1",225],["\u00e2",226],["\u00e3",227],["\u00e4",228],["\u00e5",229],["\u00e6",230],["\u00e7",231],["\u00e8",232],["\u00e9",233],["\u00ea",234],["\u00eb",235],["\u00ec",236],["\u00ed",237],["\u00ee",238],["\u00ef",239],["\u00f0",240],["\u00f1",241],["\u00f2",242],["\u00f3",243],["\u00f4",244],["\u00f5",245],["\u00f6",246],["\u00f7",247],["\u00f8",248],["\u00f9",249],["\u00fa",250],["\u00fb",251],["\u00fc",252],["\u00fd",253],["\u00fe",254],["\u00ff",255]];

function _qr_xor(a, b) = (a || b) && !(a && b);

function _qr_xor_byte(a, b) =
    let(ba=_qr_bytes2bits([a]), bb=_qr_bytes2bits([b]))
    _qr_bits2byte([ for (i=[0:8-1]) _qr_xor(ba[i], bb[i]) ? 1 : 0 ]);

function _qr_is_bit_set(val, idx) =
    floor(val / _qr_pow2[7-idx%8]) % 2 == 1;

function _qr_bits2byte(bits) =
    bits[0]*_qr_pow2[7] +
    bits[1]*_qr_pow2[6] +
    bits[2]*_qr_pow2[5] +
    bits[3]*_qr_pow2[4] +
    bits[4]*_qr_pow2[3] +
    bits[5]*_qr_pow2[2] +
    bits[6]*_qr_pow2[1] +
    bits[7]*_qr_pow2[0];

// Truncating right bitshift
function _qr_rsh(x, n) =
    floor(x/pow(2,n));

function _qr_bittrunc(x, nbits) =
    x%pow(2,nbits);

function _qr_do_str2bytes(cps, idx=0, acc=[]) =
    idx >= len(cps) ? acc :
    cps[idx] <= 127 ?
        _qr_do_str2bytes(cps, idx+1, concat(acc, cps[idx])) :
    cps[idx] <= 2047 ?
        _qr_do_str2bytes(cps, idx+1, concat(
            acc,
            128+64+_qr_rsh(cps[idx],6),
            128+_qr_bittrunc(cps[idx],6)
        )) :
    cps[idx] <= 65535 ?
        _qr_do_str2bytes(cps, idx+1, concat(
            acc,
            128+64+32+_qr_rsh(cps[idx],12),
            128+_qr_bittrunc(_qr_rsh(cps[idx],6),6),
            128+_qr_bittrunc(cps[idx],6)
        )) :
    cps[idx] <= 1114111 ?
        _qr_do_str2bytes(cps, idx+1, concat(
            acc,
            128+64+32+16+_qr_rsh(cps[idx],18),
            128+_qr_bittrunc(_qr_rsh(cps[idx],12),6),
            128+_qr_bittrunc(_qr_rsh(cps[idx],6),6),
            128+_qr_bittrunc(cps[idx],6)
        )) :
    undef;

// UTF-8 encodes the result of str2codepts
function _qr_str2bytes(s) =
    _qr_do_str2bytes(_qr_str2codepts(s));

function _qr_do_str_num_bytes(cps, idx=0, acc=0) =
    idx >= len(cps) ? acc :
    cps[idx] <= 127 ?
        _qr_do_str_num_bytes(cps, idx+1, acc+1) :
    cps[idx] <= 2047 ?
        _qr_do_str_num_bytes(cps, idx+1, acc+2) :
    cps[idx] <= 65535 ?
        _qr_do_str_num_bytes(cps, idx+1, acc+3) :
    cps[idx] <= 1114111 ?
        _qr_do_str_num_bytes(cps, idx+1, acc+3) :
    undef;

// Length of string in UTF-8 encoding
function _qr_str_num_bytes(s) =
    _qr_do_str_num_bytes(_qr_str2codepts(s));

// ord got added in ver 2019.05 (missing in Thingiverse Customizer)
function _qr_str2codepts(s) =
    version_num() >= 20190500 ?
        [ for(i=s) ord(i) ] :
    [ for(i=search(s, _qr_char_nums, num_returns_per_match=0))
        i[0] ];

function _qr_bytes2bits(bytes) = [ for(i=[0:len(bytes)*8-1]) _qr_is_bit_set(bytes[floor(i/8)], i) ? 1 : 0 ];

// Pads not fully filled bytes with 0s
function _qr_bits2bytes(bits) = [ for(i=[0:ceil(len(bits)/8)-1]) _qr_bits2byte([
    for(j=[0:8-1])
        let(bitidx=8*i + j)
        bitidx < len(bits) ? bits[bitidx] : 0
    ]) ];

function _qr_do_strjoin(strs, delim, idx=0, acc="") =
	idx >= len(strs) ? acc :
	_qr_do_strjoin(strs, delim, idx+1, str(acc, acc == "" ? "" : delim, strs[idx]));

function _qr_strjoin(strs, delim="") =
	_qr_do_strjoin(strs, delim);

// END src/bits.scad
// BEGIN src/data.scad

// Galois field 256 exponentiation table
_qr_gf256_exp = [
    1,2,4,8,16,32,64,128,29,58,116,232,205,135,19,38,
    76,152,45,90,180,117,234,201,143,3,6,12,24,48,96,192,
    157,39,78,156,37,74,148,53,106,212,181,119,238,193,159,35,
    70,140,5,10,20,40,80,160,93,186,105,210,185,111,222,161,
    95,190,97,194,153,47,94,188,101,202,137,15,30,60,120,240,
    253,231,211,187,107,214,177,127,254,225,223,163,91,182,113,226,
    217,175,67,134,17,34,68,136,13,26,52,104,208,189,103,206,
    129,31,62,124,248,237,199,147,59,118,236,197,151,51,102,204,
    133,23,46,92,184,109,218,169,79,158,33,66,132,21,42,84,
    168,77,154,41,82,164,85,170,73,146,57,114,228,213,183,115,
    230,209,191,99,198,145,63,126,252,229,215,179,123,246,241,255,
    227,219,171,75,150,49,98,196,149,55,110,220,165,87,174,65,
    130,25,50,100,200,141,7,14,28,56,112,224,221,167,83,166,
    81,162,89,178,121,242,249,239,195,155,43,86,172,69,138,9,
    18,36,72,144,61,122,244,245,247,243,251,235,203,139,11,22,
    44,88,176,125,250,233,207,131,27,54,108,216,173,71,142,1
];

// Galois field 256 log table
_qr_gf256_log = [
    undef,0,1,25,2,50,26,198,3,223,51,238,27,104,199,75,
    4,100,224,14,52,141,239,129,28,193,105,248,200,8,76,113,
    5,138,101,47,225,36,15,33,53,147,142,218,240,18,130,69,
    29,181,194,125,106,39,249,185,201,154,9,120,77,228,114,166,
    6,191,139,98,102,221,48,253,226,152,37,179,16,145,34,136,
    54,208,148,206,143,150,219,189,241,210,19,92,131,56,70,64,
    30,66,182,163,195,72,126,110,107,58,40,84,250,133,186,61,
    202,94,155,159,10,21,121,43,78,212,229,172,115,243,167,87,
    7,112,192,247,140,128,99,13,103,74,222,237,49,197,254,24,
    227,165,153,119,38,184,180,124,17,68,146,217,35,32,137,46,
    55,63,209,91,149,188,207,205,144,135,151,178,220,252,190,97,
    242,86,211,171,20,42,93,158,132,60,57,83,71,109,65,162,
    31,45,67,216,183,123,164,118,196,23,73,236,127,12,111,246,
    108,161,59,82,41,157,85,170,251,96,134,177,187,204,62,90,
    203,89,95,176,156,169,160,81,11,245,22,235,122,117,44,215,
    79,174,213,233,230,231,173,232,116,214,244,234,168,80,88,175
];

// Form is gp[0]*x^0...gp[n]*x^n (gp[i] is this constant at index i)
_qr_generator_polynomials = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [127, 122, 154, 164, 11, 68, 117],
    [255, 11, 81, 54, 239, 173, 200, 24],
    [226, 207, 158, 245, 235, 164, 232, 197, 37],
    [216, 194, 159, 111, 199, 94, 95, 113, 157, 193],
    [172, 130, 163, 50, 123, 219, 162, 248, 144, 116, 160],
    [68, 119, 67, 118, 220, 31, 7, 84, 92, 127, 213, 97],
    [137, 73, 227, 17, 177, 17, 52, 13, 46, 43, 83, 132, 120],
    [14, 54, 114, 70, 174, 151, 43, 158, 195, 127, 166, 210, 234, 163],
    [29, 196, 111, 163, 112, 74, 10, 105, 105, 139, 132, 151, 32, 134, 26],
    [59, 13, 104, 189, 68, 209, 30, 8, 163, 65, 41, 229, 98, 50, 36, 59],
    [119, 66, 83, 120, 119, 22, 197, 83, 249, 41, 143, 134, 85, 53, 125, 99, 79],
    [239, 251, 183, 113, 149, 175, 199, 215, 240, 220, 73, 82, 173, 75, 32, 67, 217, 146],
    [194, 8, 26, 146, 20, 223, 187, 152, 85, 115, 238, 133, 146, 109, 173, 138, 33, 172, 179],
    [152, 185, 240, 5, 111, 99, 6, 220, 112, 150, 69, 36, 187, 22, 228, 198, 121, 121, 165, 174],
    [44, 243, 13, 131, 49, 132, 194, 67, 214, 28, 89, 124, 82, 158, 244, 37, 236, 142, 82, 255, 89],
    [89, 179, 131, 176, 182, 244, 19, 189, 69, 40, 28, 137, 29, 123, 67, 253, 86, 218, 230, 26, 145, 245],
    [179, 68, 154, 163, 140, 136, 190, 152, 25, 85, 19, 3, 196, 27, 113, 198, 18, 130, 2, 120, 93, 41, 71],
    [122, 118, 169, 70, 178, 237, 216, 102, 115, 150, 229, 73, 130, 72, 61, 43, 206, 1, 237, 247, 127, 217, 144, 117],
    [245, 49, 228, 53, 215, 6, 205, 210, 38, 82, 56, 80, 97, 139, 81, 134, 126, 168, 98, 226, 125, 23, 171, 173, 193],
    [246, 51, 183, 4, 136, 98, 199, 152, 77, 56, 206, 24, 145, 40, 209, 117, 233, 42, 135, 68, 70, 144, 146, 77, 43, 94],
    [240, 61, 29, 145, 144, 117, 150, 48, 58, 139, 94, 134, 193, 105, 33, 169, 202, 102, 123, 113, 195, 25, 213, 6, 152, 164, 217],
    [252, 9, 28, 13, 18, 251, 208, 150, 103, 174, 100, 41, 167, 12, 247, 56, 117, 119, 233, 127, 181, 100, 121, 147, 176, 74, 58, 197],
    [228, 193, 196, 48, 170, 86, 80, 217, 54, 143, 79, 32, 88, 255, 87, 24, 15, 251, 85, 82, 201, 58, 112, 191, 153, 108, 132, 143, 170],
    [212, 246, 77, 73, 195, 192, 75, 98, 5, 70, 103, 177, 22, 217, 138, 51, 181, 246, 72, 25, 18, 46, 228, 74, 216, 195, 11, 106, 130, 150]
];

_qr_fmtinf_strs = [
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
    [0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1]
];

_qr_verinf_strs = [
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1]
];

// total data codewords / ec codewords per block / num blocks in group 1 / num data codewords in each of grp 1's blocks / num blocks in group 2 / num data codewords in each of grp 2's blocks
_qr_ectab = [
    [
        [19, 7, 1, 19, 0, 0],
        [16, 10, 1, 16, 0, 0],
        [13, 13, 1, 13, 0, 0],
        [9, 17, 1, 9, 0, 0]
    ],
    [
        [34, 10, 1, 34, 0, 0],
        [28, 16, 1, 28, 0, 0],
        [22, 22, 1, 22, 0, 0],
        [16, 28, 1, 16, 0, 0]
    ],
    [
        [55, 15, 1, 55, 0, 0],
        [44, 26, 1, 44, 0, 0],
        [34, 18, 2, 17, 0, 0],
        [26, 22, 2, 13, 0, 0]
    ],
    [
        [80, 20, 1, 80, 0, 0],
        [64, 18, 2, 32, 0, 0],
        [48, 26, 2, 24, 0, 0],
        [36, 16, 4, 9, 0, 0]
    ],
    [
        [108, 26, 1, 108, 0, 0],
        [86, 24, 2, 43, 0, 0],
        [62, 18, 2, 15, 2, 16],
        [46, 22, 2, 11, 2, 12]
    ],
    [
        [136, 18, 2, 68, 0, 0],
        [108, 16, 4, 27, 0, 0],
        [76, 24, 4, 19, 0, 0],
        [60, 28, 4, 15, 0, 0]
    ],
    [
        [156, 20, 2, 78, 0, 0],
        [124, 18, 4, 31, 0, 0],
        [88, 18, 2, 14, 4, 15],
        [66, 26, 4, 13, 1, 14]
    ],
    [
        [194, 24, 2, 97, 0, 0],
        [154, 22, 2, 38, 2, 39],
        [110, 22, 4, 18, 2, 19],
        [86, 26, 4, 14, 2, 15]
    ],
    [
        [232, 30, 2, 116, 0, 0],
        [182, 22, 3, 36, 2, 37],
        [132, 20, 4, 16, 4, 17],
        [100, 24, 4, 12, 4, 13]
    ],
    [
        [274, 18, 2, 68, 2, 69],
        [216, 26, 4, 43, 1, 44],
        [154, 24, 6, 19, 2, 20],
        [122, 28, 6, 15, 2, 16]
    ],
    [
        [324, 20, 4, 81, 0, 0],
        [254, 30, 1, 50, 4, 51],
        [180, 28, 4, 22, 4, 23],
        [140, 24, 3, 12, 8, 13]
    ],
    [
        [370, 24, 2, 92, 2, 93],
        [290, 22, 6, 36, 2, 37],
        [206, 26, 4, 20, 6, 21],
        [158, 28, 7, 14, 4, 15]
    ],
    [
        [428, 26, 4, 107, 0, 0],
        [334, 22, 8, 37, 1, 38],
        [244, 24, 8, 20, 4, 21],
        [180, 22, 12, 11, 4, 12]
    ],
    [
        [461, 30, 3, 115, 1, 116],
        [365, 24, 4, 40, 5, 41],
        [261, 20, 11, 16, 5, 17],
        [197, 24, 11, 12, 5, 13]
    ],
    [
        [523, 22, 5, 87, 1, 88],
        [415, 24, 5, 41, 5, 42],
        [295, 30, 5, 24, 7, 25],
        [223, 24, 11, 12, 7, 13]
    ],
    [
        [589, 24, 5, 98, 1, 99],
        [453, 28, 7, 45, 3, 46],
        [325, 24, 15, 19, 2, 20],
        [253, 30, 3, 15, 13, 16]
    ],
    [
        [647, 28, 1, 107, 5, 108],
        [507, 28, 10, 46, 1, 47],
        [367, 28, 1, 22, 15, 23],
        [283, 28, 2, 14, 17, 15]
    ],
    [
        [721, 30, 5, 120, 1, 121],
        [563, 26, 9, 43, 4, 44],
        [397, 28, 17, 22, 1, 23],
        [313, 28, 2, 14, 19, 15]
    ],
    [
        [795, 28, 3, 113, 4, 114],
        [627, 26, 3, 44, 11, 45],
        [445, 26, 17, 21, 4, 22],
        [341, 26, 9, 13, 16, 14]
    ],
    [
        [861, 28, 3, 107, 5, 108],
        [669, 26, 3, 41, 13, 42],
        [485, 30, 15, 24, 5, 25],
        [385, 28, 15, 15, 10, 16]
    ],
    [
        [932, 28, 4, 116, 4, 117],
        [714, 26, 17, 42, 0, 0],
        [512, 28, 17, 22, 6, 23],
        [406, 30, 19, 16, 6, 17]
    ],
    [
        [1006, 28, 2, 111, 7, 112],
        [782, 28, 17, 46, 0, 0],
        [568, 30, 7, 24, 16, 25],
        [442, 24, 34, 13, 0, 0]
    ],
    [
        [1094, 30, 4, 121, 5, 122],
        [860, 28, 4, 47, 14, 48],
        [614, 30, 11, 24, 14, 25],
        [464, 30, 16, 15, 14, 16]
    ],
    [
        [1174, 30, 6, 117, 4, 118],
        [914, 28, 6, 45, 14, 46],
        [664, 30, 11, 24, 16, 25],
        [514, 30, 30, 16, 2, 17]
    ],
    [
        [1276, 26, 8, 106, 4, 107],
        [1000, 28, 8, 47, 13, 48],
        [718, 30, 7, 24, 22, 25],
        [538, 30, 22, 15, 13, 16]
    ],
    [
        [1370, 28, 10, 114, 2, 115],
        [1062, 28, 19, 46, 4, 47],
        [754, 28, 28, 22, 6, 23],
        [596, 30, 33, 16, 4, 17]
    ],
    [
        [1468, 30, 8, 122, 4, 123],
        [1128, 28, 22, 45, 3, 46],
        [808, 30, 8, 23, 26, 24],
        [628, 30, 12, 15, 28, 16]
    ],
    [
        [1531, 30, 3, 117, 10, 118],
        [1193, 28, 3, 45, 23, 46],
        [871, 30, 4, 24, 31, 25],
        [661, 30, 11, 15, 31, 16]
    ],
    [
        [1631, 30, 7, 116, 7, 117],
        [1267, 28, 21, 45, 7, 46],
        [911, 30, 1, 23, 37, 24],
        [701, 30, 19, 15, 26, 16]
    ],
    [
        [1735, 30, 5, 115, 10, 116],
        [1373, 28, 19, 47, 10, 48],
        [985, 30, 15, 24, 25, 25],
        [745, 30, 23, 15, 25, 16]
    ],
    [
        [1843, 30, 13, 115, 3, 116],
        [1455, 28, 2, 46, 29, 47],
        [1033, 30, 42, 24, 1, 25],
        [793, 30, 23, 15, 28, 16]
    ],
    [
        [1955, 30, 17, 115, 0, 0],
        [1541, 28, 10, 46, 23, 47],
        [1115, 30, 10, 24, 35, 25],
        [845, 30, 19, 15, 35, 16]
    ],
    [
        [2071, 30, 17, 115, 1, 116],
        [1631, 28, 14, 46, 21, 47],
        [1171, 30, 29, 24, 19, 25],
        [901, 30, 11, 15, 46, 16]
    ],
    [
        [2191, 30, 13, 115, 6, 116],
        [1725, 28, 14, 46, 23, 47],
        [1231, 30, 44, 24, 7, 25],
        [961, 30, 59, 16, 1, 17]
    ],
    [
        [2306, 30, 12, 121, 7, 122],
        [1812, 28, 12, 47, 26, 48],
        [1286, 30, 39, 24, 14, 25],
        [986, 30, 22, 15, 41, 16]
    ],
    [
        [2434, 30, 6, 121, 14, 122],
        [1914, 28, 6, 47, 34, 48],
        [1354, 30, 46, 24, 10, 25],
        [1054, 30, 2, 15, 64, 16]
    ],
    [
        [2566, 30, 17, 122, 4, 123],
        [1992, 28, 29, 46, 14, 47],
        [1426, 30, 49, 24, 10, 25],
        [1096, 30, 24, 15, 46, 16]
    ],
    [
        [2702, 30, 4, 122, 18, 123],
        [2102, 28, 13, 46, 32, 47],
        [1502, 30, 48, 24, 14, 25],
        [1142, 30, 42, 15, 32, 16]
    ],
    [
        [2812, 30, 20, 117, 4, 118],
        [2216, 28, 40, 47, 7, 48],
        [1582, 30, 43, 24, 22, 25],
        [1222, 30, 10, 15, 67, 16]
    ],
    [
        [2956, 30, 19, 118, 6, 119],
        [2334, 28, 18, 47, 31, 48],
        [1666, 30, 34, 24, 34, 25],
        [1276, 30, 20, 15, 61, 16]
    ]
];

// END src/data.scad