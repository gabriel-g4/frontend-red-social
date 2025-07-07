import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions, Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { StatsService } from '../../services/stats.service';

Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

@Component({
    selector: 'app-dashboard-estadisticas',
    imports: [CommonModule, ReactiveFormsModule, BaseChartDirective],
    templateUrl: './dashboard-estadisticas.component.html',
    styleUrl: './dashboard-estadisticas.component.css'
})
export class DashboardEstadisticasComponent {

    postsFiltroForm: FormGroup;
    commsFiltroForm: FormGroup;
    commentsPorPostFiltroForm: FormGroup;
    // Datos para posts
    postsChartData: any;
    postsChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                }
            }
        },
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Publicaciones por usuario' }
        }
    };

    // Datos para comentarios
    commentsChartData: any;
    commentsChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                }
            }
        },
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Comentarios por usuario' }
        }
    };

    commentsPorPostChartData: any;
    commentsPorPostChartOptions: ChartOptions = {
    responsive: true,
    scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                }
            }
        },
    plugins: {
        legend: { display: false },
        title: { display: true, text: 'Comentarios por publicación' }
    }
    };

    constructor(private fb: FormBuilder, private statsService: StatsService) {
        this.postsFiltroForm = this.fb.group({
            startDate: [''],
            endDate: ['']
        });
        this.commsFiltroForm = this.fb.group({
            startDate: [''],
            endDate: ['']
        });
        this.commentsPorPostFiltroForm = this.fb.group({
        startDate: [''],
        endDate: ['']
        });
    }


    obtenerEstadisticasPosts() {
        const fechas = this.postsFiltroForm.value;

        // Posts
        this.statsService.obtenerDatosCompletos(fechas).subscribe(data => {
            this.postsChartData = {
                labels: data.map(d => d.label),
                datasets: [{
                    data: data.map(d => d.count),
                    backgroundColor: '#3f51b5'
                }]
            };
        });

    }

    obtenerEstadisticasComentarios() {
         // Comentarios
         const fechas = this.commsFiltroForm.value;

        this.statsService.obtenerDatosComentarios(fechas).subscribe(data => {
            console.log('Comentarios stats:', data);
            this.commentsChartData = {
                labels: data.map(d => d.label),
                datasets: [{
                    data: data.map(d => d.count),
                    backgroundColor: '#ff9800'
                }]
            };
        });

    }

    obtenerEstadisticasComentariosPorPost() {
        const fechas = this.commentsPorPostFiltroForm.value;
        this.statsService.obtenerDatosComentariosPorPost(fechas).subscribe(data => {
            this.commentsPorPostChartData = {
            labels: data.map(d => d.label),
            datasets: [{
                data: data.map(d => d.count),
                backgroundColor: '#4caf50'
            }]
            };
        });
    }

}
