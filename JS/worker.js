onmessage = function(e) {
    const digits = parseInt(e.data);

    if (isNaN(digits) || digits < 1 || digits > 8) {
        this.postMessage("Érvénytelen számjegy!");
        return;
    }

    const result = findPrime(digits);
    this.postMessage(result ? `Első ${digits} számjegyű prímszám: ${result}` : "Nem található ilyen prím.");
}

function isPrime(n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    const sqrt = Math.floor(Math.sqrt(n));

    for (let i = 3; i <= sqrt; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}

function findPrime(digits) {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) -1;

    for (let i = min; i <= max; i++) {
        if (isPrime(i)) {
            return i;
        }
    }

    return null;
}