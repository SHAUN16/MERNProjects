function canViewApply(user, apply){
    return(
        user.role === "admin" || apply.createdBy == user.userId
    )
}

function canDeleteApply(user, apply){
    return(
        apply.createdBy == user.userId
    )
}

function scopedApplies(user, applies){
    if(user.role === "admin"){
        return applies
    }

    return applies.filter(apply => apply.createdBy == user.userId)
}

module.exports = {
    canViewApply,
    scopedApplies,
    canDeleteApply,
}