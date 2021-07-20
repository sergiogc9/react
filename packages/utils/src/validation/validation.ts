import isEmpty from 'lodash/isEmpty';

export const isPhoneNumber = (phone: string | null | undefined) => {
	return !isEmpty(phone) && !!phone!.match(new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/));
};
