export class HashMap{
    entry = 0;

    constructor() {
        this.capacity = 16;
        this.bucket = new Array(this.capacity);
    }

    hash(key){
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++){
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
    }

    resize() {
        const newBucket = new Array(this.capacity);
        this.bucket.forEach(item => {
            if (item){
                item.forEach(([key,value]) => {
                    const hashValue = this.hash(key);

                    if (newBucket[hashValue]){
                        newBucket[hashValue].push([key,value]);
                    }else{
                        newBucket[hashValue] = [[key,value]];
                    }
                })
            }
        })

        this.bucket = newBucket;
    }

    getLoadFactor() {
        return this.entry / this.capacity
    }

    set(key,value) {
        let loadFactor = this.getLoadFactor();
        const hashValue = this.hash(key);
        // this.entry++;

        if (loadFactor > 0.75){
            this.capacity *= 2;
            this.resize();
        }

        if (this.has(key)){
            this.bucket[hashValue] = this.bucket[hashValue].map(([itemKey,itemValue]) => {
                if (itemKey === key) {
                    return [itemKey,value];
                }return [itemKey,itemValue];
            })

            return;
        }

        this.entry++;
        if (this.bucket[hashValue]){
            this.bucket[hashValue].push([key,value]);
        }else{
            this.bucket[hashValue] = [[key,value]];
        }
    }

    get(key) {
        const hashValue = this.hash(key);
        if (!this.bucket[hashValue]) return null;
        const value = this.bucket[hashValue].find(x => x[0] === key);
        if(value) {
            return value[1];
        }return null;
    }

    has(key){
        return this.get(key) !== null;
    }

    remove(key) {
        const hashValue = this.hash(key);
        if (this.bucket[hashValue]) {
            this.bucket[hashValue] =  this.bucket[hashValue].filter(([itemKey,itemValue]) => itemKey != key)
        }else{
            return false;
        }
    }

    clear = () => {
        this.bucket = [];
        this.capacity = 16;
        this.entry = 0;
    }
    entries = () => this.bucket;

    keys(){
        const keysArray = [];
        this.bucket.forEach((item) => {
        if (item) {
            item.forEach(([itemKey,itemValue]) => {
                keysArray.push(itemKey);
            })
        }
    })
    return keysArray; 
    }

    length = () => {
        return this.keys().length;
    };

    values(){
        const valuesArray = [];
        this.bucket.forEach((item) => {
        if (item) {
            item.forEach(([itemKey,itemValue]) => {
                valuesArray.push(itemValue);
            })
        }
    })
    return valuesArray; 
    }
}

