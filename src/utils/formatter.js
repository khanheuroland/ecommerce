
formatNumber(number, group_separator)
{
    if(number>999)
    {
        let reverted = number.toString().split('').reverse();
        let formatted=[]
        for(let i=1; i<=reverted.length; i++)
        {
            formatted.push(reverted[i-1]);
            if(i%3==0 && i!=reverted.length)
            {
                formatted.push(group_separator);
            }
        }
        return formatted.reverse().join('');
    }
    else
        return number;
}
