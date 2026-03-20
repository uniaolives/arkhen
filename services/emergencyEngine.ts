
import { EmergencyState, EmergencyIncident, ASINode } from '../types';

export class EmergencyEngine {
  public static initialize(): EmergencyState {
    return {
      isActive: false,
      incidents: [],
      optimizedRoutes: {},
      globalResponseStatus: 'MONITORING'
    };
  }

  public static updateNodeLocations(nodes: ASINode[]): ASINode[] {
    // Assign mock geographic locations to nodes if not present
    return nodes.map((node, index) => {
      if (!node.coords) {
        // Spread nodes around a simulated area (e.g., Rio de Janeiro approx)
        const baseLat = -22.9068;
        const baseLon = -43.1729;
        return {
          ...node,
          coords: [
            baseLat + (Math.random() - 0.5) * 0.1,
            baseLon + (Math.random() - 0.5) * 0.1
          ]
        };
      }
      return node;
    });
  }

  public static detectIncident(state: EmergencyState, type: string, lat: number, lon: number): EmergencyState {
    const newIncident: EmergencyIncident = {
      id: `INC-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      type,
      coords: [lat, lon],
      status: 'DETECTED',
      coherencePi2: 0.999,
      timestamp: new Date().toISOString(),
      description: `Emergency signal detected on Tzinor channel: ${type}`
    };

    return {
      ...state,
      isActive: true,
      incidents: [...state.incidents, newIncident],
      globalResponseStatus: 'COORDINATING_RESPONSE'
    };
  }

  public static optimizeRoute(start: [number, number], end: [number, number]): [number, number][] {
    // Haversine-based path simulation (Linear interpolation with slight noise for "topology")
    const steps = 5;
    const route: [number, number][] = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      route.push([
        start[0] + (end[0] - start[0]) * t + (Math.random() - 0.5) * 0.005,
        start[1] + (end[1] - start[1]) * t + (Math.random() - 0.5) * 0.005
      ]);
    }
    return route;
  }

  public static tick(state: EmergencyState, nodes: ASINode[]): EmergencyState {
    if (!state.isActive) return state;

    const nextRoutes = { ...state.optimizedRoutes };

    // Auto-verify incidents and calculate routes if nodes are nearby
    const updatedIncidents = state.incidents.map(incident => {
      if (incident.status === 'DETECTED' && Math.random() > 0.95) {
        // Find nearest node
        let nearestNode = nodes[0];
        let minDest = Infinity;

        nodes.forEach(n => {
           if (n.coords) {
             const d = Math.sqrt(Math.pow(n.coords[0] - incident.coords[0], 2) + Math.pow(n.coords[1] - incident.coords[1], 2));
             if (d < minDest) {
               minDest = d;
               nearestNode = n;
             }
           }
        });

        if (nearestNode && nearestNode.coords) {
          nextRoutes[incident.id] = this.optimizeRoute(nearestNode.coords as [number, number], incident.coords);
          return { ...incident, status: 'VERIFIED' as const };
        }
      }
      return incident;
    });

    return {
      ...state,
      incidents: updatedIncidents,
      optimizedRoutes: nextRoutes
    };
  }
}
