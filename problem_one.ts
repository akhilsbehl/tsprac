function reverse_words_in_sentence(s: string): string {
    let words: string[] = s.split(" ");
    for (let i in words) {
        words[i] = reverse_string(words[i]);
    }
    return words.join(" ");
}

function reverse_string(s: string): string {
    let chars: string[] = s.split("");
    let l: number = s.length;
    let rchars: string[]  = new Array(l);
    for (let i: number = 0; i < l; i++) {
        rchars[i] = chars[l - 1 - i];
    }
    let r: string = rchars.join("");
    return r;
}

let hw: string = "Hello, World!";
console.log(reverse_words_in_sentence(hw));
