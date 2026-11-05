// Observer.ts - anything that wants to be told when a Subject changes (in MVC: the views).
// T is the type of subject being observed, so that update() gets the real type - e.g. Observer<ClockModel>.

export interface Observer<T> {
  update(subject: T): void;
}
