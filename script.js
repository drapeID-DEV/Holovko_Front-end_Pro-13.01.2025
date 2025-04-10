class Student {
  constructor(firstName, lastName, birthYear, grades) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
    this.grades = grades;
    this.journal = new Array(25);
  }

  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getAge() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.birthYear;
  }

  getAverageGrade() {
    const sum = this.grades.reduce(
      (accumulator, grade) => accumulator + grade,
      0
    );
    return sum / this.grades.length;
  }

  setVisit(value) {
    const currentVisit = this.journal.findIndex(
      (element) => element == undefined
    );
    if (currentVisit !== -1) {
      this.journal[currentVisit] = value;
    } else {
      console.log(`There is no empty place!`);
    }
  }

  present() {
    this.setVisit(true);
  }

  absent() {
    this.setVisit(false);
  }

  getAverageVisits() {
    let visited = 0;
    this.journal.forEach((element) => {
      if (element == true) visited++;
    });
    return visited / this.journal.length;
  }

  summary() {
    const avgGrade = this.getAverageGrade();
    const avgVisits = this.getAverageVisits();

    if (avgGrade > 90 && avgVisits > 0.9) {
      return "Молодець!";
    } else if (avgGrade > 90 || avgVisits > 0.9) {
      return "Добре, але можна краще";
    } else {
      return "Редиска!";
    }
  }
}

const student1 = new Student("Андрій", "Головко", 2005, [98, 90, 87, 95]);
for (let i = 0; i < 20; i++) {
  student1.present();
}
for (let i = 0; i < 5; i++) {
  student1.absent();
}

const student2 = new Student("Максим", "Проценко", 2004, [52, 60, 65, 70]);
for (let i = 0; i < 10; i++) {
  student2.present();
}
for (let i = 0; i < 15; i++) {
  student2.absent();
}

console.log(
  `${student1.getName()}\nВік: ${student1.getAge()}\nРезультат:${student1.summary()}\n`
);
console.log(
  `${student2.getName()}\nВік: ${student2.getAge()}\nРезультат:${student2.summary()}`
);
