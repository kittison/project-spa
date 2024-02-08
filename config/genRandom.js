module.exports = class Gen{
    static randomString(){
        return Math.random().toString(36).slice(-6);
    }
}