export function viewShowHandle(viewShow_obj,viewHidden_obj) {
    viewHidden_obj.classList.add('page-hidden');
    setTimeout(function () {
        viewShow_obj.classList.add('page-show');
        viewHidden_obj.classList.remove('page-hidden');
        viewHidden_obj.classList.remove('page-show');
    },1000);
}