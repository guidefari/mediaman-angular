import { Injectable } from '@angular/core'; 
import { MediaService } from '../../shared/services/abstract-media.service'; 
import { Book } from '../entities/book.entity'; 
import { MediaCollection } from '../../shared/entities/media-collection.entity'; 
 
@Injectable({ 
  providedIn: 'root' 
}) 
export class BookService extends MediaService<Book> { 
  private _bookCollections: Map<string, MediaCollection<Book>> = new Map<string, MediaCollection<Book>>(); 
 
  constructor() { 
    super(Book); 
  } 
 
  get bookCollections(): Map<string, MediaCollection<Book>> { 
    return this._bookCollections; 
  } 

  reloadBookCollections(): void { 
    this.getMediaCollectionIdentifiersList().then(keys => { 
      this._bookCollections.clear(); // clear the current state 
      keys.forEach(key => { 
        this.loadMediaCollection(key).then(collection => { 
          this._bookCollections.set(key, collection); 
        }); 
      }); 
    }); 
} 
} 