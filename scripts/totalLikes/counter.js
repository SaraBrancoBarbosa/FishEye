class TotalLikesCounter {
    constructor() {
        this._count = 0
        this._$likesCount = document.querySelector('.like-count')
    }

    update(action) {
        if (action === 'INC') {
            this._count += 1
        } else if (action === 'DEC') {
            this._count -= 1
        } else {
            throw "Unknow action"
        }

        this._$likesCount.innerHTML = this._count
    }
}