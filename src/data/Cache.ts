export { store, retrieve, remove, exists, clearAll };

function store(cacheId: string, data: any) {
    localStorage.setItem("cache-" + cacheId, JSON.stringify(data));
}

function retrieve(cacheId: string) : any {
    let item = localStorage.getItem("cache-" + cacheId)
    return item === null ? null : JSON.parse(item);
}

function remove(cacheId: string) {
    localStorage.removeItem("cache-" + cacheId);
}

function exists(cacheId: string) : boolean{
    return localStorage.getItem("cache-" + cacheId) !== null;
}

function clearAll() {
    Object.keys(localStorage).filter(key => key.indexOf("cache-") === 0).forEach(key => {
        localStorage.removeItem(key);
        console.log("Removed from cache:", key);
    });
}
