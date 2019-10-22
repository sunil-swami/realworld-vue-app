import { mount } from '@vue/test-utils';

import Pagination from '../../../src/components/Pagination.vue';

const createWrapper = ({ currentPage = 1 }) => {
  return mount(Pagination, {
    propsData: {
      pages: [1, 2, 3, 4],
      currentPage,
    },
  });
};

describe('Pagination', () => {
  it('should contain the correct payload when pagination event is emitted', () => {
    const wrapper = createWrapper({ currentPage: 1 });
    const pageItem = wrapper.find('[data-test="page-link-2"]');
    pageItem.trigger('click');
    expect(wrapper.emitted('update:currentPage')[0][0]).toBe(2);
  });
  it('should render active class to correct elements', () => {
    const wrapper = createWrapper({ currentPage: 2 });
    const activeItem = wrapper.find('.active');
    expect(activeItem.text()).toBe('2');
  });

  it('should emit an event if page is clicked which is not active', () => {
    const wrapper = createWrapper({ currentPage: 1 });
    const pageItem = wrapper.find('[data-test="page-link-2"]');
    pageItem.trigger('click');
    expect(wrapper.emitted('update:currentPage')).toBeTruthy();
  });
});
