import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  user: String = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    $(this.elementRef.nativeElement)
      .find('.sidebar-nav-link')
      .on('click', (e) => {
        var subMenu = $(e.target).next();
        console.log(subMenu);
        $(e.target).parent().siblings().find('.sidebar-nav-sub').slideUp();
        $('.sub-with-sub ul').slideUp();

        if (subMenu.length) {
          e.preventDefault();
          subMenu.slideToggle();
        }
      });
  }
}
