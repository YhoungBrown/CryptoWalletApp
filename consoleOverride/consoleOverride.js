const originalLog = console.log;
console.log = function (data) {
    if (typeof data ==="object"){
        data = JSON.stringify(data, null, 2);
    }
    // call the original console.log with the formatted data
    originalLog(data);
};