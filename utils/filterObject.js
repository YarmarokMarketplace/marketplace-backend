const buildFilterObject = (params) => { 
    const { category, goodtype } = params;
    if (category && goodtype) { 
        return { $and: [{ category }, { goodtype }] }
    }
    if (category && !goodtype) { 
        return { category }
    }
}

module.exports = buildFilterObject;