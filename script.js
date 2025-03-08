function cacheNumber(fn) {
    if(!cacheNumber.cache) {
        cacheNumber.cache = {};
    }
    return function(phone) {
        let key = fn(phone);
        if(!cacheNumber.cache[key]) {
            cacheNumber.cache[key] = 1;
            console.log(`New number calling: ${phone}`);
        }
        else {
            cacheNumber.cache[key]++;
            console.log(`The number ${phone} has called to you ${cacheNumber.cache[key]} times`);
        }
        if(Object.keys(cacheNumber.cache).length > 10) {
            console.log("Cache is full. Deleting the oldest record!");
            delete cacheNumber.cache[Object.keys(cacheNumber.cache)[0]];
        }
        return cacheNumber.cache[key];
    }
}

function phoneNum(phone) {
    return phone;
}

const cacheFunc = cacheNumber(phoneNum);

cacheFunc("+380976712229");
cacheFunc("+380976712229");
cacheFunc("+380503245312");
cacheFunc("+380931234567");
cacheFunc("+380671112233");
cacheFunc("+380501234567");
cacheFunc("+380501234567");
cacheFunc("+380971112233");
cacheFunc("+380501234567");
cacheFunc("+380682345678");
cacheFunc("+380991234567");
cacheFunc("+380661234567");
cacheFunc("+380991234567");
cacheFunc("+380963456789");
cacheFunc("+380731112233");
