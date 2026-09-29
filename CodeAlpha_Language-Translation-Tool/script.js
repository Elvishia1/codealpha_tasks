const textInput = document.getElementById("textInput");
const translateButton = document.getElementById("translateButton");
const translationResult = document.getElementById("translationResult");

const sourceLanguage = document.getElementById("sourceLanguage");
const targetLanguage = document.getElementById("targetLanguage");

const copyButton = document.getElementById("copyButton");

translateButton.addEventListener("click", async function() {

    const text = textInput.value;
    const source = sourceLanguage.value;
    const target = targetLanguage.value;

    translationResult.textContent = "Translating...";

    try {
        const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
);

const data = await response.json();

if (data.responseStatus === 200) {
    translationResult.textContent = data.responseData.translatedText;
} else {
    translationResult.textContent = "Translation failed.";
    console.log(data);
}

    } catch (error) {
        translationResult.textContent = "Something went wrong.";
        console.log(error);
    }
    
    copyButton.addEventListener("click", function() {
    const translation = translationResult.textContent;

    navigator.clipboard.writeText(translation);

    alert("Translation copied!");
});
});