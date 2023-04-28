const fs = require("fs");
const ncp = require("copy-paste");
const Prism = require("prismjs");
const loadLanguages = require("prismjs/components/");

let prism_lang_str;

if (process.argv.length > 2) {
  prism_lang_str = process.argv[2].toString();
} else {
  prism_lang_str = "c";
}

loadLanguages([prism_lang_str]);

const before_code = `<!-- ${prism_lang_str.toUpperCase()} style sheets for Prism.js -->
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css"
  rel="stylesheet"
/>
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.css"
  rel="stylesheet"
/>
<!-- Code snippet content -->
<pre class="line-numbers"><code class="language-${prism_lang_str}">`;

const after_code = `</code></pre>
<!-- Javascript for Prism.js core, line number display, and ${prism_lang_str} syntax highlight -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${prism_lang_str}.min.js"></script>`;

// The code snippet you want to highlight, as a string
const code = fs.readFileSync("./code.c").toString();

let prism_lang;

switch (prism_lang_str) {
  case "c":
    prism_lang = Prism.languages.c;
    break;
  case "cpp":
    prism_lang = Prism.languages.cpp;
    break;
  case "bash":
    prism_lang = Prism.languages.bash;
    break;
  case "js":
    prism_lang = Prism.languages.js;
    break;
  case "rust":
    prism_lang = Prism.languages.rust;
    break;
  case "python":
    prism_lang = Prism.languages.python;
    break;
  case "csharp":
    prism_lang = Prism.languages.csharp;
    break;
  default:
    prism_lang = Prism.languages.c;
    break;
}

// Returns a highlighted HTML string
const html = Prism.highlight(code, prism_lang, prism_lang_str);

let final_code = before_code + html + after_code;

fs.writeFileSync("highlighted-code.html", final_code);

// Copy to clipboard
ncp.copy(final_code, function () {
  console.log("Code generated and copied to the clipboard!");
});
