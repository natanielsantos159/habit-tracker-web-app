import { ReactComponent as AcademicCapIcon } from '../assets/habit-icons/academic-cap.svg';
import { ReactComponent as AnnotationIcon } from '../assets/habit-icons/annotation.svg';
import { ReactComponent as BookmarkIcon } from '../assets/habit-icons/bookmark.svg';
import { ReactComponent as BookOpenIcon } from '../assets/habit-icons/book-open.svg';
import { ReactComponent as BriefcaseAltIcon } from '../assets/habit-icons/briefcase-alt.svg';
import { ReactComponent as BulbOnIcon } from '../assets/habit-icons/bulb-on.svg';
import { ReactComponent as GamepadIcon } from '../assets/habit-icons/gamepad.svg';
import { ReactComponent as HeartIcon } from '../assets/habit-icons/heart.svg';
import { ReactComponent as HomeAltIcon } from '../assets/habit-icons/home-alt.svg';
import { ReactComponent as MoonIcon } from '../assets/habit-icons/moon.svg';
import { ReactComponent as NewsIcon } from '../assets/habit-icons/news.svg';
import { ReactComponent as NotebookIcon } from '../assets/habit-icons/notebook.svg';
import { ReactComponent as NoteIcon } from '../assets/habit-icons/note.svg';
import { ReactComponent as PencilIcon } from '../assets/habit-icons/pencil.svg';
import { ReactComponent as PlayCircleIcon } from '../assets/habit-icons/play-circle.svg';
import { ReactComponent as ShoppingBagIcon } from '../assets/habit-icons/shopping-bag.svg';
import { ReactComponent as ShoppingCartIcon } from '../assets/habit-icons/shopping-cart.svg';
import { ReactComponent as SparklesIcon } from '../assets/habit-icons/sparkles.svg';
import { ReactComponent as StarIcon } from '../assets/habit-icons/star.svg';
import { ReactComponent as SunIcon } from '../assets/habit-icons/sun.svg';
import { ReactComponent as TerminalIcon } from '../assets/habit-icons/terminal.svg';
import { ReactComponent as UsersIcon } from '../assets/habit-icons/users.svg';

function HabitIcon({ iconName, ...otherProps }) {
  switch (iconName) {
    case "academic-cap":
      return <AcademicCapIcon {...otherProps} />;
    case "annotation":
      return <AnnotationIcon {...otherProps} />;
    case "bookmark":
      return <BookmarkIcon {...otherProps} />;
    case "book-open":
      return <BookOpenIcon {...otherProps} />;
    case "briefcase-alt":
      return <BriefcaseAltIcon {...otherProps} />;
    case "bulb-on":
      return <BulbOnIcon {...otherProps} />;
    case "gamepad":
      return <GamepadIcon {...otherProps} />;
    case "heart":
      return <HeartIcon {...otherProps} />;
    case "home-alt":
      return <HomeAltIcon {...otherProps} />;
    case "moon":
      return <MoonIcon {...otherProps} />;
    case "news":
      return <NewsIcon {...otherProps} />;
    case "notebook":
      return <NotebookIcon {...otherProps} />;
    case "note":
      return <NoteIcon {...otherProps} />;
    case "pencil":
      return <PencilIcon {...otherProps} />;
    case "play-circle":
      return <PlayCircleIcon {...otherProps} />;
    case "shopping-bag":
      return <ShoppingBagIcon {...otherProps} />;
    case "shopping-cart":
      return <ShoppingCartIcon {...otherProps} />;
    case "sparkles":
      return <SparklesIcon {...otherProps} />;
    case "star":
      return <StarIcon {...otherProps} />;
    case "sun":
      return <SunIcon {...otherProps} />;
    case "terminal":
      return <TerminalIcon {...otherProps} />;
    case "users":
      return <UsersIcon {...otherProps} />;
    default:
      return null;
  }
}

export default HabitIcon;