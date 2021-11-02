export const normalizePhone = (phone?: string) => {
    if (!phone) return null

    const num = phone.split('')
    return `+${num[0]} (${num[1] + num[2] + num[3]}) ${num[4] + num[5] + num[6]}-${num[7] + num[8]}-${num[9] + num[10]}`
}
