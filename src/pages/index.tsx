import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Link from "next/link";
import styles from "../styles/Home.module.css";

type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
};

type CoursesData = {
  courses: Course[];
};

const GET_ALL_COURSES = gql`
  query GetAllCourses {
    courses {
      id
      title
      description
      level
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery<CoursesData>(GET_ALL_COURSES);

  if (loading) return <div className={styles.loading}>Loading courses...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Available Courses</h1>
      </div>

      <div className={styles.courseGrid}>
        {data?.courses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <Link className={styles.coureseLink} href={`/courses/${course.id}`}>
              <div className={styles.courseContent}>
                <h2 className={styles.courseTitle}>{course.title}</h2>
                <p className={styles.courseDescription}>{course.description}</p>
                <span className={styles.courseLevel}>
                  Level: {course.level}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
