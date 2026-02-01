const { test, expect } = require('@playwright/test');

// Helper function to wait for real-time translation to complete
async function waitForTranslation(page, timeout = 2000) {
  await page.waitForTimeout(timeout);
}

// Helper function to convert and read output
async function convertAndRead(page, input) {
  const textarea = page.locator('textarea[placeholder*="Singlish"]');
  await textarea.fill(input);
  await waitForTranslation(page);
  
  // First try to get from the output textarea directly (most reliable)
  let output = '';
  try {
    const textareas = await page.locator('textarea').all();
    if (textareas.length >= 2) {
      output = await textareas[1].inputValue();
    }
  } catch (e) {}
  
  // If textarea approach didn't work, try finding the output div
  // but avoid suggestion dropdowns
  if (!output || output.length === 0) {
    try {
      // Wait a bit more for suggestions to disappear
      await page.waitForTimeout(500);
      
      // Look for the main content area, avoiding popups/suggestions
      const outputDiv = page.locator('div').filter({ hasText: /[අ-ෆ]/ }).last();
      const text = await outputDiv.textContent();
      
      // Extract only continuous Sinhala text (the actual translation)
      // This regex captures the main translated text
      const lines = text.split('\n').filter(line => /[අ-ෆ]/.test(line));
      output = lines[lines.length - 1] || text;
    } catch (e) {}
  }
  
  return (output || '').trim();
}

// Helper function to check for Sinhala characters
function hasSinhalaChars(text) {
  return /[\u0D80-\u0DF8]/.test(text);
}

// Auto-generated from uploaded Excel
const testData = [
  {
    id: "Pos_Fun_0001",
    name: "Simple sentence",
    type: "positive",
    lengthType: "S",
    input: "Sisun paasal giyooya.",
    expected: "සිසුන් පාසල් ගියෝය."
  },
  {
    id: "Pos_Fun_0002",
    name: "Compound sentences (two ideas joined)",
    type: "positive",
    lengthType: "M",
    input: "api sellam karamu iita kalin dhavalta kalaa imu",
    expected: "අපි සෙල්ලම් කරමු ඊට කලින් දවල්ට කලා ඉමු"
  },
  {
    id: "Pos_Fun_0003",
    name: "complex sentences",
    type: "positive",
    lengthType: "M",
    input: "udhaeesana pramaadha vi avadhi vima hethuven pasalata yana atharathura siinuva naadha viya",
    expected: "උදෑසන ප්‍රමාද වි අවදි විම හෙතුවෙන් පසලට යන අතරතුර සීනුව නාද විය"
  },
  {
    id: "Pos_Fun_0004",
    name: "Interrogative (questions)",
    type: "positive",
    lengthType: "S",
    input: "kohomadha saepa saniipa",
    expected: "කොහොමද සැප සනීප"
  },
  {
    id: "Pos_Fun_0005",
    name: "imperative (commands)",
    type: "positive",
    lengthType: "M",
    input: "mema maasaya thuladhi viBhaagaya sadhahaa suudhaanam vanu.",
    expected: "මෙම මාසය තුලදි විභාගය සදහා සූදානම් වනු."
  },
  {
    id: "Pos_Fun_0006",
    name: "Positive sentence",
    type: "positive",
    lengthType: "M",
    input: "mata viBhaagaya jaya ganna puLuvan",
    expected: "මට විභාගය ජය ගන්න පුළුවන්"
  },
  {
    id: "Pos_Fun_0007",
    name: "Negative sentence",
    type: "positive",
    lengthType: "M",
    input: "mama hithanne mata eya karanna baee",
    expected: "මම හිතන්නෙ මට එය කරන්න බෑ"
  },
  {
    id: "Pos_Fun_0008",
    name: "greetings",
    type: "positive",
    lengthType: "S",
    input: "saadharayen piligannavaa",
    expected: "සාදරයෙන් පිලිගන්නවා"
  },
  {
    id: "Pos_Fun_0009",
    name: "Informal phrasing",
    type: "positive",
    lengthType: "M",
    input: "ohoma karaata hariyanne naee machan",
    expected: "ඔහොම කරාට හරියන්නේ නෑ මචන්"
  },
  {
    id: "Pos_Fun_0010",
    name: "Polite phrasing",
    type: "positive",
    lengthType: "M",
    input: "mata vathura tikak dhenna puluvandha ?",
    expected: "මට වතුර ටිකක් දෙන්න පුලුවන්ද ?"
  },
  {
    id: "Pos_Fun_0011",
    name: "Tense variations (Present)",
    type: "positive",
    lengthType: "S",
    input: "ovun chaarikaava giyaha",
    expected: "ඔවුන් චාරිකාව ගියහ"
  },
  {
    id: "Pos_Fun_0012",
    name: "Tense variations (Future)",
    type: "positive",
    lengthType: "M",
    input: "aeya labana maasayee dhii vidhes gatha vanneeya",
    expected: "ඇය ලබන මාසයේ දී විදෙස් ගත වන්නේය"
  },
  {
    id: "Pos_Fun_0013",
    name: "Negation patterns",
    type: "positive",
    lengthType: "S",
    input: "mata eeka karanna baee",
    expected: "මට ඒක කරන්න බෑ"
  },
  {
    id: "Pos_Fun_0014",
    name: "Singular usage and pronoun variations",
    type: "positive",
    lengthType: "S",
    input: "mama raekiyaavata yannemi",
    expected: "මම රැකියාවට යන්නෙමි"
  },
  {
    id: "Pos_Fun_0015",
    name: "plural usage and pronoun variations",
    type: "positive",
    lengthType: "M",
    input: "oyalaa chithrapataya balanna yanavadha?",
    expected: "ඔයලා චිත්‍රපටය බලන්න යනවද?"
  },
  {
    id: "Pos_Fun_0016",
    name: "Request forms with varying degrees of politeness",
    type: "positive",
    lengthType: "M",
    input: "puluvan nam magee kudayath aran enna",
    expected: "පුලුවන් නම් මගේ කුඩයත් අරන් එන්න"
  },
  {
    id: "Pos_Fun_0017",
    name: "Short inputs (≤ 30 characters)",
    type: "positive",
    lengthType: "S",
    input: "mama yanavaa",
    expected: "මම යනවා"
  },
  {
    id: "Pos_Fun_0018",
    name: "Long inputs (≥ 300 characters)",
    type: "positive",
    lengthType: "M",
    input: "nagaraya thula pavathina adhika vaahana thadhabadhaya hethuven mahajanathavaagee kaalaya saha shramaya anisilesa viyadham vana athara, meyata piliyamak lesa podhu pravahana seevaavaya thavadhurathath dhiyunu kiriimata piyavara gena aetha",
    expected: "නගරය තුල පවතින අදික වාහන තදබදය හෙතුවෙන් මහජනතවාගේ කාලය සහ ශ්‍රමය අනිසිලෙස වියදම් වන අතර, මෙයට පිලියමක් ලෙස පොදු ප්‍රවහන සේවාවය තවදුරතත් දියුනු කිරීමට පියවර ගෙන ඇත"
  },
  {
    id: "Pos_Fun_0019",
    name: "English abbreviations and short forms",
    type: "positive",
    lengthType: "S",
    input: "mama A/L kalee 2021 varShayee",
    expected: "මම A/L කලේ 2021 වර්ෂයේ"
  },
  {
    id: "Pos_Fun_0020",
    name: "English technical/brand terms embedded in Singlish",
    type: "positive",
    lengthType: "M",
    input: "sammuKa pariikshanaya zoom harahaa paevaethvee",
    expected: "සම්මුඛ පරීක්ශනය zoom හරහා පැවැත්වේ"
  },
  {
    id: "Pos_Fun_0021",
    name: "Sentences containing places and common English words that should remain as they are",
    type: "positive",
    lengthType: "M",
    input: "nivasata avashYA siyaLu dhee dhaen supermarket thulin labagatha haeka",
    expected: "නිවසට අවශ්‍ය සියළු දේ දැන් supermarket තුලින් ලබගත හැක"
  },
  {
    id: "Pos_Fun_0022",
    name: "Inputs containing punctuation marks",
    type: "positive",
    lengthType: "S",
    input: "theruvan saraNayi!",
    expected: "තෙරුවන් සරණයි!"
  },
  {
    id: "Pos_Fun_0023",
    name: "numeric format (Currency) and english terms",
    type: "positive",
    lengthType: "S",
    input: "ee Shirt eka RS.5000 venavaa",
    expected: "ඒ Shirt එක RS.5000 වෙනවා"
  },
  {
    id: "Pos_Fun_0024",
    name: "Time formats",
    type: "positive",
    lengthType: "M",
    input: "eyaa edhdhi 9.00 PM vath venavaa",
    expected: "එයා එද්දි 9.00 PM වත් වෙනවා"
  },
  {
    id: "Pos_Fun_0025",
    name: "text formatting(Multiple spaces) with Interrogative (questions)",
    type: "positive",
    lengthType: "M",
    input: "adha      Match        eka         dhinanavadha?",
    expected: "අද      Match        එක         දිනනවද?"
  },
  {
    id: "Pos_Fun_0026",
    name: "text formatting-Line breaks (multi-line input)",
    type: "positive",
    lengthType: "M",
    input: "mata dhaen paasalata yanna thiyanavaa api heta mee gaena thava kathaa karamu",
    expected: "මට දැන් පාසලට යන්න තියනවා අපි හෙට මේ ගැන තව කතා කරමු"
  },
  {
    id: "Pos_Fun_0027",
    name: "Paragraph-style input (medium/long)",
    type: "positive",
    lengthType: "M",
    input: "adhika pohora mila saha dhashaka gaNanaavak thibuna jala arbudhaya heethuven govi janathaava dhiirGha kaalayak piidhaa vindha athara, aluth kramaveedhayak yatathee pohora saha biija sahana dhiimata thiiraNaya kara aetha.",
    expected: "අදික පොහොර මිල සහ දශක ගණනාවක් තිබුන ජල අර්බුදය හේතුවෙන් ගොවි ජනතාව දීර්ඝ කාලයක් පීදා වින්ද අතර, අලුත් ක්‍රමවේදයක් යටතේ පොහොර සහ බීජ සහන දීමට තීරණය කර ඇත."
  },
  

  //negative test cases can be added here
   {
  id: "Neg_Fun_0001",
  name: "Slang / informal (adoo machan...)",
  type: "negative",
  lengthType: "S",
  input: "adoo machan mata epaa velaa thiyenne",
  expected: "අඩෝ මචං මට එපා වෙලා තියෙන්නෙ"
},
{
  id: "Neg_Fun_0002",
  name: "Unnatural/incorrect structure (grammar issue)",
  type: "negative",
  lengthType: "M",
  input: "owun charikawa yaama nisaa sellam kiriimata yaamata nohaekiwiya",
  expected: "ඔවුන් චරිකව යාම නිසා සෙල්ලම් කිරීමට යාමට නොහෑකිවිය"
},
{
  id: "Neg_Fun_0003",
  name: "Corrupted input / symbols + codes",
  type: "negative",
  lengthType: "M",
  input: "mata mee potha vibaagaya sadhah+I146+D126",
  expected: "මට මේ පොත විභාගය සදහා බාවිතා කල හැකිද?"
},
{
  id: "Neg_Fun_0004",
  name: "English tech term embedded (framework/tool)",
  type: "negative",
  lengthType: "S",
  input: "ape project ekata api Laravel pavichchi kalaa",
  expected: "අපේ project එකට අපි Laravel  පවිච්චි කලා"
},
{
  id: "Neg_Fun_0005",
  name: "Missing spaces / merged words",
  type: "negative",
  lengthType: "S",
  input: "ohuraekiyaavatayannetraineken",
  expected: "ඔහු රැකියාවට යන්නෙ train එකෙන්"
},
{
  id: "Neg_Fun_0006",
  name: "Ambiguous / unclear phrase",
  type: "negative",
  lengthType: "S",
  input: "loku va ess ak atha Laga",
  expected: "ලොකු වැස්සක් අත ළග"
},
{
  id: "Neg_Fun_0007",
  name: "Formal notice style sentence",
  type: "negative",
  lengthType: "M",
  input: "dhumriya vedikava vetha lagaveemata niyamatha bava nivedhanaya karana ladhii",
  expected: "දුම්රිය වෙදිකාව වෙත ළගාවීමට නියමිත බව නිවේදනය කරන ළදී"
},
{
  id: "Neg_Fun_0008",
  name: "Repetition / noisy input",
  type: "negative",
  lengthType: "M",
  input: "hari hari hari hari hari hari egollo anivaaren enavaa",
  expected: "හරි හරි එගොල්ලො අනිවාරෙන් එනවා"
},
{
  id: "Neg_Fun_0009",
  name: "Mixed spelling / odd token (i)",
  type: "negative",
  lengthType: "S",
  input: "shrilankaavee udhdhamanaya i ihala gos aetha",
  expected: "ශ්‍රිලන්කාවේ උද්දමනය ඉහල ගොස් ඇත"
},
{
  id: "Neg_Fun_0010",
  name: "Broken / unclear question",
  type: "negative",
  lengthType: "S",
  input: "oka karanna danna karuth nadda",
  expected: "ඔක කරන්න දන්න කවූරුත් නැද්ද"
},


  // UI Test Cases

    {
    id: "Pos_UI_0001",
    name: "Real-time translation update",
    type: "positive",
    lengthType: "M",
    input: "saamaajika gaasthu velavata labaa dhenna",
    expected: "සාමාජික ගාස්තු වෙලවට ලබා දෙන්න"
  },

  {
    id: "Pos_UI_0002",
    name: "Clear button clears both fields",
    type: "positive",
    lengthType: "M",
    input: "api sellam karamu",
    expected: "අපි සෙල්ලම් කරමු"
  },

  {
    id: "Neg_UI_0001",
    name: "UI - Faild to handle user password formate",
    type: "negative",
    lengthType: "S",
    input: "ohuge password eka 87546@Nimesh",
    expected: "ඔහුගෙ password එක 87546@Nimesh"
  },


  {
    id: "Neg_UI_0002",
    name: "can not Handle emojis in input",
    type: "positive",
    lengthType: "S",
    input: "Suba aluth avurudhdhak veevaa☀️",
    expected: "සුබ අලුත් අවුරුද්දක් වේවා☀️"
  },
];

test.describe('Singlish to Sinhala Translator Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the translator website
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
  });

  // Generate test cases from test data
  testData.forEach((testCase) => {
    test(`${testCase.id} - ${testCase.name}`, async ({ page }) => {
      const rawOutput = await convertAndRead(page, testCase.input);
      
      // Clean up the output - remove any UI text, keep only the translation
      // Remove common UI elements that might be captured
      let output = rawOutput
        .replace(/Singlish.*?Translator/gi, '')
        .replace(/Switch Typing Language/gi, '')
        .replace(/Features/gi, '')
        .replace(/View Suggestions/gi, '')
        .replace(/Word Autocorrect/gi, '')
        .replace(/Singlish Touchpad/gi, '')
        .replace(/Translate/gi, '')
        .replace(/Clear/gi, '')
        .replace(/English/gi, '')
        .replace(/🔁/g, '')
        .replace(/🗑️/g, '')
        .trim();
      
      // Extract only the Sinhala text with allowed characters
      const sinhalaMatch = output.match(/[අ-ෆ\u0DCA\u0DCF-\u0DDF\u200D\s!?.,;:\-0-9A-Za-z/]+/);
      if (sinhalaMatch) {
        output = sinhalaMatch[0].trim();
      }
      
      // Skip validation for empty input tests
      if (testCase.input === "") {
        expect(output.length).toBe(0);
      } else {
        // Check that output exists and contains Sinhala characters
        expect(output.length).toBeGreaterThan(0);
        expect(hasSinhalaChars(output)).toBe(true);
        
        // Check exact match with expected output
        expect(output).toBe(testCase.expected);
      }
    });
  });
});

// UI-specific tests
test.describe('UI Functionality Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForLoadState('networkidle');
  });

  // Positive UI Tests

  test('Pos_UI_0001 - Real-time translation update', async ({ page }) => {
    const inputTextarea = page.locator('textarea[placeholder*="Singlish"]');
    const textareas = await page.locator('textarea').all();
    const outputTextarea = textareas.length >= 2 ? textareas[1] : null;
    
    // Test input for real-time translation
    const testInput = "saamaajika gaasthu velavata labaa dhenna";
    const expectedOutput = "සාමාජික ගාස්තු වෙලවට ලබා දෙන්න";
    
    // Fill the input field
    await inputTextarea.fill(testInput);
    
    // Wait for real-time translation to complete
    await page.waitForTimeout(2000);
    
    // Verify input field contains the text
    const inputValue = await inputTextarea.inputValue();
    expect(inputValue).toBe(testInput);
    
    // Verify output field is populated and contains Sinhala characters
    if (outputTextarea) {
      const outputValue = await outputTextarea.inputValue();
      expect(outputValue.length).toBeGreaterThan(0);
      expect(hasSinhalaChars(outputValue)).toBe(true);
      
      // Verify the output matches expected translation
      const cleanedOutput = outputValue.trim();
      expect(cleanedOutput).toBe(expectedOutput);
    }
  });

  test('Pos_UI_0002 - Clear button clears both fields', async ({ page }) => {
    const textarea = page.locator('textarea[placeholder*="Singlish"]');
    
    // Fill input
    await textarea.fill('mama yanavaa');
    await page.waitForTimeout(1000);
    
    // Click clear button (adjust selector based on actual UI)
    const clearButton = page.locator('button:has-text("Clear")');
    if (await clearButton.isVisible()) {
      await clearButton.click();
      await page.waitForTimeout(500);
      
      // Verify both fields are empty
      const filledText = await textarea.inputValue();
      expect(filledText).toBe('');
    }
  });





});

module.exports = testData;