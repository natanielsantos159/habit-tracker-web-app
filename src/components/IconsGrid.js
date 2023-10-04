import { ReactComponent as AcademicCapIcon } from '../assets/habit-icons/academic-cap.svg';
import { ReactComponent as AnnotationIcon } from '../assets/habit-icons/annotation.svg';
import { ReactComponent as BookmarkIcon } from '../assets/habit-icons/bookmark.svg';
import { ReactComponent as BookOpenIcon } from '../assets/habit-icons/book-open.svg';
import { ReactComponent as BriefcaseAltIcon } from '../assets/habit-icons/briefcase-alt.svg';
import { ReactComponent as BulbOnIcon } from '../assets/habit-icons/bulb-on.svg';
import { ReactComponent as FilmIcon } from '../assets/habit-icons/film.svg';
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
import { ReactComponent as UsersIcon } from '../assets/habit-icons/users1.svg';
import { Grid, GridItem } from '@chakra-ui/react';

function IconsGrid({ onIconClick }) {
  return (
    <Grid templateColumns='repeat(4, 1fr)'>
      <GridItem p="10px" onClick={onIconClick}><BookmarkIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><AcademicCapIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><AnnotationIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><BookOpenIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><BriefcaseAltIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><BulbOnIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><FilmIcon stroke="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><GamepadIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><HeartIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><HomeAltIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><MoonIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><NewsIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><NotebookIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><NoteIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><PencilIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><PlayCircleIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><ShoppingBagIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><ShoppingCartIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><SparklesIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><StarIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><SunIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><TerminalIcon fill="var(--tg-theme-text-color)"/></GridItem>
      <GridItem p="10px" onClick={onIconClick}><UsersIcon fill="var(--tg-theme-text-color)"/></GridItem>
    </Grid>
  )
}

export default IconsGrid;