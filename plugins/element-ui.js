import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import {
  Tabs,
  TabPane,
  Tooltip,
  Form,
  FormItem,
  // Select,
  Option,
  OptionGroup,
  Button,
  Progress,
  Input,
  Collapse,
  CollapseItem,
  Timeline,
  TimelineItem,
  Checkbox,
  Menu,
  MenuItem,
  Carousel,
  CarouselItem,
  Upload,
  Scrollbar,
  Loading,
  Notification,
  MessageBox,
  Message,
  Icon,
  // Empty,
  Table,
  TableColumn,
  Pagination
} from 'element-ui'

const ELEMENT_COMPONENT = [
  Tabs,
  TabPane,
  Tooltip,
  Form,
  FormItem,
  // Select,
  Option,
  OptionGroup,
  Button,
  Progress,
  Input,
  Collapse,
  CollapseItem,
  Timeline,
  TimelineItem,
  Checkbox,
  Menu,
  MenuItem,
  Carousel,
  CarouselItem,
  Upload,
  Scrollbar,
  Icon,
  // Empty,
  Table,
  TableColumn,
  Pagination
];

const Element = {
  install (Vue) {
    ELEMENT_COMPONENT.forEach(component => {
      Vue.component(component.name, component)
    })
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    // Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = Message;
    Vue.use(Loading.directive);
  }
}


Vue.use(Element, { locale })
