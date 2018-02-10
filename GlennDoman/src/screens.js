import { Navigation } from 'react-native-navigation';

import Lesson from './screens/lesson/lesson';
import History from './screens/history/history';
import Topic from './screens/topic/topic';
import AddTopic from './screens/topic/add.topic';
import Settings from './screens/settings/settings';
import AddLesson from './screens/lesson/add_lesson';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
    Navigation.registerComponent('kids.Lesson', () => Lesson, store, Provider);
    Navigation.registerComponent('kids.AddLesson', () => AddLesson, store, Provider);
    Navigation.registerComponent('kids.History', () => History, store, Provider);
    Navigation.registerComponent('kids.Topic', () => Topic, store, Provider);
    Navigation.registerComponent('kids.Settings', () => Settings, store, Provider);
    Navigation.registerComponent('kids.AddTopic', () => AddTopic, store, Provider);
    Navigation.registerComponent('kids.ModalAddTopic', () => ModalAddTopic);
}