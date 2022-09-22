export function splitValue(value) {
    let newval = '';
    value = value.replace(/\s/g, '');
    for (let i = 0; i < value.length; i++) {
        if (i % 4 == 0 && i > 0) newval = newval.concat(' ');
        newval = newval.concat(value[i]);
    }
    return newval;
}

export function numberWithCommas(value) {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const myLoader = (src) => {
    src = src.split(' ').join('-');
    return `https://fypaesthetics.s3.ap-south-1.amazonaws.com/${src}.webp`;
};

export const formatCurrency = (value, locale = 'en-GB') => {
    return Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'PKR',
    }).format(value);
};
