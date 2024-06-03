
let filter= {
    category: [],
    brand: [],
};

const setFilter = (value) => {
    filter = value;
}

const loop = (filter) => {
    let queryString = '';
    for (let key in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, key) && filter[key].length > 0) {
            const lastValue = filter[key][filter[key].length - 1];
            queryString = `${key}=${lastValue}`;
        }
    }
    console.log("queryString---> ", queryString);
}

const updateFilter = (category , categoryName) => {
    const newFilter = { ...filter, [category]: [...filter[category], categoryName] };
    setFilter(newFilter);
}

// Updating filter and calling loop function
updateFilter('category', 'laptop');
loop(filter);

updateFilter('brand', 'apple');
loop(filter);

updateFilter('category', 'mobile');
loop(filter);

updateFilter('brand', 'iPhone');
loop(filter);

console.log(filter);



const filter={
    category:[],
    brand:[],
    sort:[],
}

let lastKeys = [ category , sort];
let prevLastValues = [ laptops , -price ]


queryString = astKeys[lastKeys.length-2]=prevLastValues[prevLastValues-2]

queryString = 
